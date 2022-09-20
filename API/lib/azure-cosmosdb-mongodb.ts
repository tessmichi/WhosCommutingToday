import { Schema, model, connect } from "mongoose";
import * as utils from "./utils";

let db = null;

type AttendanceType = {
  name: string,
  startDate: string,
  endDate: string
}

const AttendanceSchema = new Schema({
  name: Schema.Types.String,
  startDate: Schema.Types.String,
  endDate: Schema.Types.String,
});
const AttendanceModel = model("Attendance", AttendanceSchema, "WhosInOffice");

export const init = async () => {
  if (!db) {
    db = await connect(process.env["CosmosDbConnectionString"]);
  }
};

export const addItem = async (attendance: AttendanceType) => {
  const startDate = new Date(attendance.startDate);
  const endDate = new Date(attendance.endDate);

  if (startDate.getTime() > endDate.getTime())
    throw Error("The start date cannot be bigger than the end date");

  const modelToInsert = new AttendanceModel();
  modelToInsert["name"] = attendance.name;
  modelToInsert["startDate"] = utils.formatDate(startDate);
  modelToInsert["endDate"] = utils.formatDate(endDate);

  return await modelToInsert.save();
};

export const clearItems = async () => {
  return await Promise.all(
    (
      await AttendanceModel.find({
        endDate: { $lt: utils.formatDate(new Date()) },
      })
    ).map(async (item) => AttendanceModel.findByIdAndDelete(item._id))
  );
};

export const findItemByName = async (name: string) => {
  return await AttendanceModel.find({
    name: name,
  });
};

export const findItems = async (query = {}) => {
  return await AttendanceModel.find(query);
};

