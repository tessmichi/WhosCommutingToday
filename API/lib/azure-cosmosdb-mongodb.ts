import { connect, model, Schema, SchemaTypes } from "mongoose";
import * as utils from "./utils";


let db = null;

type InsertArgType = {
  name: string,
  startDate: string,
  endDate: string
};

export type AttendanceType = {
  name: string,
  range: {
    startDate: string,
    endDate: string
  }[]
};

const AttendanceSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true
  },
  range: {
    type: [{
      startDate: {
        type: SchemaTypes.Date,
        required: true
      },
      endDate: {
        type: SchemaTypes.Date,
        required: true
      }
    }],
    require: true
  }
});

const AttendanceModel = model("Attendance", AttendanceSchema, "WhosInOffice");

export const init = async () => {
  if (!db)
    db = await connect(process.env["CosmosDbConnectionString"]);
};

export const addItem = async (attendance: InsertArgType) => {
  const startDate = utils.formatDate(attendance.startDate);
  const endDate = utils.formatDate(attendance.endDate);

  if (startDate.getTime() > endDate.getTime())
    throw Error("The start date cannot be after the end date");
  
  const doc = await findOneByName(attendance.name);

  if (doc) {
    doc.range.push({
      startDate,
      endDate
    });
    
    doc.range = doc.range.sort((a, b) => {
      if (a.startDate < b.startDate) return -1;
      else if (a.startDate > b.startDate) return 1;
      else {
        if (a.endDate < b.endDate) return -1;
        else if (a.endDate > b.endDate) return 1;
        return 0;
      }
    }).reduce((acc, val) => {
      if (acc.length === 0) {
        return [val];
      }
      const prev = acc[acc.length - 1];
      let inRange = false;
    
      /* Outer range */
      if (val.startDate <= prev.startDate && val.endDate > prev.endDate) {
        prev.startDate = val.startDate;
        prev.endDate = val.endDate;
        inRange = true;
      }
      /* Inner range */
      else if (val.startDate <= prev.startDate && val.endDate <= prev.endDate) {
        inRange = true;
      }
      /* val with start before */
      else if (prev.startDate < val.startDate) {
        const temp = new Date(val.startDate);
        temp.setDate(temp.getDate() - 1);
    
        /* Check if val.endDate is later then the previous day from the prev range */
        if (prev.endDate >= temp) {
          prev.endDate = val.endDate;
          inRange = true;
        }
      }
    
      if (!inRange) {
        acc = [...acc, val];
      }
    
      return acc;
    }, []);

    return await doc.save();
  } else {
    return await AttendanceModel.create({
      name: attendance.name,
      range: [{
        startDate: attendance.startDate,
        endDate: attendance.endDate
      }]
    });
  }

};

export const clearItems = async () => {
  const today = new Date();
  const items = await AttendanceModel.find();
  for (const item of items) {
    item.range = item.range.filter(r => r.endDate <= today);
    item.range.forEach(r => {
      if (r.startDate < today)
        r.startDate = today
    });
    await item.save();
  }
};

export const findOneByName = async (name: string) => {
  return await AttendanceModel.findOne({
    name,
  });
};

export const findByDate = async (date: Date) => {
  const items = await AttendanceModel.find();
  return items.filter(el => el.range.find(r => r.startDate <= date && date <= r.endDate));
};
