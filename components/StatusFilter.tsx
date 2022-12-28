import { FC, useEffect, useState } from "react";
import { TaskStatusId } from "@types";

interface StatusFilterProps {
  value: Array<TaskStatusId>;
  onChange: (statusList: Array<TaskStatusId>) => void;
}

interface StatusFilterItem {
  id: TaskStatusId;
  label: string;
  classes: string;
}

const statusFilterList: Array<StatusFilterItem> = [
  {
    id: 1,
    label: "todo",
    classes: "bg-red-300",
  },
  {
    id: 2,
    label: "inprogress",
    classes: "bg-sky-600",
  },
  {
    id: 3,
    label: "done",
    classes: "bg-emerald-400",
  },
];

const StatusFilter: FC<StatusFilterProps> = ({ value, onChange }) => {
  const [state, setState] = useState<Array<TaskStatusId>>([...value]);

  const handleToggle = (statusId: TaskStatusId) => {
    state.includes(statusId)
      ? setState((prev) => prev.filter((e) => e !== statusId))
      : setState((prev) => [statusId, ...prev]);
  };

  useEffect(() => {
    onChange?.(state);
  }, [onChange, state]);

  return (
    <ul className="flex gap-x-2 self-center">
      {statusFilterList.map((e) => (
        <li
          onClick={() => handleToggle(e.id)}
          key={e.id}
          className={`px-2 text-white cursor-pointer text-sm rounded-full ${
            e.classes
          } ${!state.includes(e.id) ? "opacity-30" : ""}`}
        >
          {e.label}
        </li>
      ))}
    </ul>
  );
};

export default StatusFilter;
