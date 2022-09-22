import * as React from "react";
import axios from "axios";

export const PresenceContext = React.createContext<
  undefined | PresenceContextValues
>(undefined);
const Provider = PresenceContext.Provider;

interface PresenceContextValues {
  presenceData: IPresenceData;
  setPresenceData: (presenceData: IPresenceData) => void;
  setDateRange: (dateRange: IDateRange) => void;
  addUserToDateRange: (name: string, dateRange: IDateRange) => void;
  removeUserFromDateRange: (name: string, dateRange: IDateRange) => void;
}

interface Props {
  children: React.ReactNode;
}

interface IDateRange {
  startDate: Date;
  endDate?: Date;
}

interface IPerson {
  name: string;
}

interface IPresenceData {
  range: IDateRange | null;
  people: IPerson[];
}

export function PresenceDataProvider({ children }: Props) {
  const [presenceData, setPresenceData] = React.useState<IPresenceData>({
    range: null,
    people: [],
  });

  function handlePresenceData(presenceData: IPresenceData) {
    setPresenceData(presenceData);
  }

  function setDateRange(date: IDateRange) {
    const stringDate = new Date(date.startDate).toLocaleDateString();
    axios
      .get("https://whosinoffice.azurewebsites.net/api/func-get-users", {
        params: {
          date: stringDate,
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((result) => {
        setPresenceData({
          range: date,
          people: [],
        });
        console.log("result", result);
      });
  }

  function addUserToDateRange(name: string, dateRange: IDateRange): void {
    console.log("add user");
    //API POST
  }

  function removeUserFromDateRange(name: string, dateRange: IDateRange): void {
    console.log("remove user");
    //TO BE DONE
  }

  // const currentUserIsComing = people.includes()
  return (
    <Provider
      value={{
        presenceData,
        setPresenceData: handlePresenceData,
        setDateRange,
        addUserToDateRange,
        removeUserFromDateRange,
      }}
    >
      {children}
    </Provider>
  );
}

export function usePresenceContext() {
  const context = React.useContext(PresenceContext);

  if (context === undefined) {
    throw new Error("Presence Context is not defined");
  }

  return context;
}
