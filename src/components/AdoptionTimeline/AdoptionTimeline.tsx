// @ts-nocheck
import { useAppSelector } from "@state/index";
import styles from "./AdoptionTimeline.module.scss";
import { Card, Flex, ScrollArea, Text, Tooltip } from "@radix-ui/themes";
import { useMemo, useState } from "react";

const AdoptionTimeline = () => {
  const [statSort, setStatSort] = useState<"newToOld" | "oldToNew">("newToOld");
  const statsToSort = useAppSelector((s) => s.utils.activeProjectStats);

  // Sort stats
  console.log("statsToSort: ", statsToSort);

  const stats = useMemo(
    () =>
      [...statsToSort].sort((a, b) => {
        if (statSort === "oldToNew") {
          return a.timestamp - b.timestamp;
        } else {
          return b.timestamp - a.timestamp;
        }
      }),
    [statSort, statsToSort]
  );

  return (
    <Card size="3">
      <Text weight="medium">Adoption timeline</Text>
      <Flex direction="column" gap="1">
        <Flex gap="2" align="center" justify="between">
          <Text size="1" color="gray">
            Your timeline of project scans, click on them to see individual
            reports.
          </Text>
        </Flex>
        <ScrollArea scrollbars="horizontal" className={styles.adoptionTimeline}>
          <Flex position="relative" width="100%" height="9" align="center">
            <div className={styles.fineLine} />
            {stats.map((stat, idx) => (
              <Tooltip
                key={idx}
                content={`Scanned on ${new Date(stat.timestamp).toString()}`}
              />
            ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  );
};

export default AdoptionTimeline;
