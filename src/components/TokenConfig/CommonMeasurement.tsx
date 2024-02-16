import SelectExportFormat from "@components/ExportProject/SelectExportFormat";
import Tooltip from "../Tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import * as Switch from "@radix-ui/react-switch";
import { CommonData } from "./TokenConfig";
import styles from "./TokenConfig.module.scss";
import { useIntl } from "react-intl";

type CommonMeasurementProps = {
  data: CommonData;
  onChange: (d: CommonData) => void;
};

export const CommonMeasurement = ({
  data,
  onChange,
}: CommonMeasurementProps) => {
  const intl = useIntl();

  return (
    <>
      <span className={styles.info}>
        {intl.formatMessage({ id: "commonMeasurement.configurationInfo", defaultMessage: "Here you can configure the token measurement configurations, like translating PX to REM, or similar." })}
      </span>
      <div className={styles.formatSelection}>
        <label className={styles.exportLabel} htmlFor="typeAsSuffix">
          {intl.formatMessage({ id: "commonMeasurement.typeAsSuffix", defaultMessage: "Type as suffix: " })}
          <Tooltip content={intl.formatMessage({ id: "commonMeasurement.tooltip.typeAsSuffix", defaultMessage: "Token type will be attached after the token name, for example TOKEN-NAME-letter-spacing" })}>
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
        {intl.formatMessage({ id: "commonMeasurement.roundingPrecisionInfo", defaultMessage: "Control rounding precision for the measurement values." })}
      </span>
      <div className={styles.formatSelection}>
        <label className={styles.exportLabel} htmlFor="useREM">
          {intl.formatMessage({ id: "commonMeasurement.roundingPrecision", defaultMessage: "Rounding precision: " })}
          <span className={styles.optional}>({intl.formatMessage({ id: "commonMeasurement.default", defaultMessage: "default 2" })})</span>
        </label>
        <SelectExportFormat
          label={intl.formatMessage({ id: "commonMeasurement.floatingPrecision", defaultMessage: "Floating precision" })}
          placeholder={intl.formatMessage({ id: "commonMeasurement.selectPrecision", defaultMessage: "Select precision" })}
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