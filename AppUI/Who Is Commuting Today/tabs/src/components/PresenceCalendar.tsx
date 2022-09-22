import * as React from "react";
import { Calendar, defaultCalendarStrings } from "@fluentui/react";
import { usePresenceContext } from "./PresenceDataProvider";

export const PresenceCalendar: React.FunctionComponent = () => {
  const { setDateRange } = usePresenceContext();
  function onSelectDate(date: Date) {
    setDateRange({ startDate: date });
  }

  return (
    <div style={{ height: "360px" }}>
      <Calendar
        showMonthPickerAsOverlay
        showGoToToday
        onSelectDate={onSelectDate}
        // Calendar uses English strings by default. For localized apps, you must override this prop.
        strings={defaultCalendarStrings}
      />
    </div>
  );
};
