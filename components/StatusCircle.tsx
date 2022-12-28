import { FC } from "react";
import { TaskStatusId } from "@types";

interface StatusCircleProps {
  statusId: TaskStatusId;
}

const CLASSES: Record<TaskStatusId, string> = {
  1: "bg-red-300",
  2: "bg-sky-600",
  3: "bg-emerald-400",
};

const StatusCircle: FC<StatusCircleProps> = ({ statusId }) => (
  <span
    className={`self-center shrink-0 w-3 h-3 rounded-full ${CLASSES[statusId]} `}
  ></span>
);

export default StatusCircle;
