import * as React from "react";
import { PresenceCalendar } from "./PresenceCalendar";
import { usePresenceContext } from "./PresenceDataProvider";
import { PresenceList } from "./PresenceList";

export const Tab: React.FunctionComponent = () => {
  const presenceContextValues = usePresenceContext();
  const { presenceData } = presenceContextValues;
  console.log("presenceData", presenceData);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        minWidth: "1rem",
        paddingLeft: "0.25rem",
        paddingTop: "1rem",
      }}
    >
      <PresenceCalendar />
      <PresenceList />
    </div>
  );
};
