// @ts-nocheck
import SelectExportFormat from "@components/ExportProject/SelectExportFormat";
import Tooltip from "../Tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import * as Switch from "@radix-ui/react-switch";
import { CommonData } from "./TokenConfig";
import { useState } from "react";

type CommonMeasurementProps = {
  data: CommonData;
  onChange: (d: CommonData) => void;
};

export const CommonMeasurement = ({
  data,
  onChange,
}: CommonMeasurementProps) => {
  console.log("CommonMeasurement", data);

  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });

  const handleName = () => {
    setFullName({
      firstName: "Davit",
      lastName: "Anhaght",
    });
  };

  return (
    <>
      <span className={styles.info}>
        Here ${fullName} can configure the token measurement configurations,
        like translating PX to REM, or similar.
      </span>
      <button onClick={handleName}> Set My Name </button>
      <div className={styles.formatSelection}>
        <label className={styles.exportLabel} htmlFor="typeAsSuffix">
          Type as suffix:{" "}
          <Tooltip content="Token type will be attached after the token name, for example TOKEN-NAME-letter-spacing">
            <QuestionMarkCircledIcon className={styles.questionMark} />
          </Tooltip>
        </label>
        <Switch.Root
          id="typeAsSuffix"
          checked={data.typeAsSuffix}
          className={styles.SwitchRoot}
          onCheckedChange={(c) => onChange({ ...data, typeAsSuffix: c })}
        >
          <Switch.Thumb className={styles.SwitchThumb} />
        </Switch.Root>
      </div>
      <hr className={styles.separator} />
      <span className={styles.info}>
        Control rounding precision for the measurement values.
      </span>
      <div className={styles.formatSelection}>
        <label className={styles.exportLabel} htmlFor="useREM">
          Rounding precision:{" "}
          <span className={styles.optional}>(default 2)</span>
        </label>
        <SelectExportFormat
          label="Floating precision"
          placeholder="Select precision"
          value={data.roundNumber.fractionDigits.toString()}
          onChange={(v: string) =>
            onChange({ ...data, roundNumber: { fractionDigits: parseInt(v) } })
          }
          options={["1", "2", "3", "4", "5", "6"]}
        />
      </div>
    </>
  );
};
