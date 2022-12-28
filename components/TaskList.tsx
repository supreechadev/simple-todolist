import { FC, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import TaskItem from "@components/TaskItem";
import StatusFilter from "@components/StatusFilter";
import { useTask } from "@contexts/taskContext";
import { Task, TaskStatusId } from "@types";

const TaskList: FC = () => {
  const { taskList } = useTask();
  const [filteredTaskList, setFilteredTaskList] = useState<Array<Task>>([]);
  const [statusSelected, setStatusSeleted] = useState<Array<TaskStatusId>>([
    1, 2, 3,
  ]);

  useEffect(() => {
    setFilteredTaskList(
      taskList.filter((e) => statusSelected.includes(e.statusId))
    );
  }, [taskList, statusSelected]);

  return (
    <>
      <header className="flex justify-between">
        <h2 className="text-lg text-red-400">Task list</h2>
        <StatusFilter value={statusSelected} onChange={setStatusSeleted} />
      </header>
      <ul>
        <AnimatePresence>
          {filteredTaskList.map((e) => (
            <TaskItem key={e.id} data={e} />
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};

TaskList.displayName = "TaskList";

export default TaskList;
