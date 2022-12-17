import { forwardRef, useImperativeHandle, useState } from "react";
import { Task } from "@types";
import { TaskServices } from "@api";
import { useEffect } from "react";

const TaskList = forwardRef((_, ref) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Array<Task>>([]);

  const fetchTaskList = () => {
    try {
      setLoading(true);
      const result = TaskServices.getTaskList();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const unshiftTask = (task: Task) => {
    setTaskList((prev) => {
      prev.unshift(task);
      return [...prev];
    });
  };
  // df
  useImperativeHandle(ref, () => ({
    unshiftTask,
  }));

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <>
      <h2 className="text-lg text-red-400">Task list</h2>
      {taskList.map((e) => (
        <div key={e.id}>{e.name}</div>
      ))}
    </>
  );
});

TaskList.displayName = "TaskList";

export default TaskList;
