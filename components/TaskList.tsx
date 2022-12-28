import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          {filteredTaskList.length === 0 && (
            <motion.li
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.5,
                },
              }}
              exit={{
                transition: {
                  duration: 0,
                },
              }}
              className="text-center text-sm text-stone-400 py-4"
            >
              No task available
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </>
  );
};

TaskList.displayName = "TaskList";

export default TaskList;
