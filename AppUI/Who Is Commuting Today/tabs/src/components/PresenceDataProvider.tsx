import * as React from "react";

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

  function setDateRange(dateRange: IDateRange) {
    // API GET call for persons
    setPresenceData({
      range: dateRange,
      people: [
        { name: "user test" },
        { name: "user test 2" },
        { name: "user test 3" },
      ],
    });
  }

  function addUserToDateRange(name: string, dateRange: IDateRange): void {
    console.log("add user");
    //API POST
  }

  function removeUserFromDateRange(name: string, dateRange: IDateRange): void {
    console.log("remove user");
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
