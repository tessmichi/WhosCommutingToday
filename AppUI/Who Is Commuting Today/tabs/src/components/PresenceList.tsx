import * as React from "react";
import { usePresenceContext } from "./PresenceDataProvider";
import { Text, Flex, Divider } from "@fluentui/react-northstar";

export const PresenceList: React.FunctionComponent = () => {
  const { presenceData } = usePresenceContext();
  const startDateFormatted = presenceData.range?.startDate
    ? new Date(presenceData.range?.startDate).toDateString()
    : "";
  const endDateFormatted = presenceData.range?.endDate
    ? `- ${new Date(presenceData.range?.endDate).toDateString()}`
    : "";

  return (
    <>
      {startDateFormatted && (
        <Flex gap="gap.medium" column={true}>
          <span>{`See who is comming on ${startDateFormatted} ${endDateFormatted}`}</span>
          <Divider />
          <div>
            {presenceData.people.map((person, idx) => {
              return (
                <>
                  <Text content={person.name} key={idx} />
                  <Divider />
                </>
              );
            })}
          </div>
        </Flex>
      )}
    </>
  );
};
