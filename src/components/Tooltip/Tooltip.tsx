// @ts-nocheck
import * as TooltipComp from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.scss";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
};

const Tooltip = ({ children, content }: TooltipProps) => (
  <TooltipComp.Provider>
    <TooltipComp.Root delayDuration={400}>
      <TooltipComp.Trigger asChild>{children}</TooltipComp.Trigger>
      <TooltipComp.Portal>
        <TooltipComp.Content className={styles.tooltipContent} sideOffset={5}>
          {content}
          <TooltipComp.Arrow className={styles.tooltipArrow} />
        </TooltipComp.Content>
      </TooltipComp.Portal>
    </TooltipComp.Root>
  </TooltipComp.Provider>
);

export default Tooltip;
