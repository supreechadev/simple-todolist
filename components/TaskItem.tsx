import { FC, useEffect, useReducer } from "react";
import { Task } from "@types";

interface TaskItemProps {
  value: Task;
  onDelete: () => void;
  onChange: (task: Task) => void;
}

type State = Partial<Task>;

interface Action {
  type: keyof Task;
  value: Task[keyof Task];
}

const reducer = (state: State, action: Action): State => {
  const { type, value } = action;
  switch (type) {
    case "name":
      return { ...state, name: value as Task["name"] };
    case "statusId":
      return {
        ...state,
        statusId: value as Task["statusId"],
      };
    default:
      return state;
  }
};

const TaskItem: FC<TaskItemProps> = ({ value, onDelete, onChange }) => {
  const [state, dispatch] = useReducer(reducer, { ...value });

  useEffect(() => {
    onChange?.({ ...state } as Task);
  }, [onChange, state]);

  return <div></div>;
};

export default TaskItem;
