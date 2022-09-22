import * as React from "react";
import { PresenceCalendar } from "./PresenceCalendar";
import { usePresenceContext } from "./PresenceDataProvider";
import { PresenceList } from "./PresenceList";
import { Flex } from "@fluentui/react-northstar";

export const Tab: React.FunctionComponent = () => {
  const presenceContextValues = usePresenceContext();
  const { presenceData } = presenceContextValues;
  console.log("presenceData", presenceData);

  return (
    <Flex padding="padding.medium" space="evenly">
      <PresenceCalendar />
      <PresenceList />
    </Flex>
  );
};
