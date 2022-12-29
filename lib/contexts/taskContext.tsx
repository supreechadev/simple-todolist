import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { collection, getDocs } from "firebase/firestore";
import useFirebase from "@hooks/useFirebase";
import { Task } from "@types";

interface TaskContext {
  isLoading: boolean;
  taskList: Array<Task>;
  addTask: (task: Task) => void;
  removeTask: (taskId: Task["id"]) => void;
  updateTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContext>({
  isLoading: false,
  taskList: [],
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {},
});

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const { db } = useFirebase();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Array<Task>>([]);

  const addTask = (task: Task) => {
    setTaskList((prev) => {
      prev.unshift(task);
      return [...prev];
    });
  };

  const removeTask = (taskId: Task["id"]) => {
    setTaskList((prev) => {
      return prev.filter((e) => e.id !== taskId);
    });
  };

  const updateTask = (task: Task) => {
    setTaskList((prev) => {
      const taskIndex = prev.findIndex((e) => e.id === task.id);
      prev[taskIndex] = task;
      return [...prev];
    });
  };

  const fetchTask = async () => {
    try {
      setLoading(true);
      const { docs } = await getDocs(collection(db, "tasks"));
      setTaskList(docs.map((e) => ({ ...e.data(), id: e.id })) as Array<Task>);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        isLoading,
        taskList,
        addTask,
        removeTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = (): TaskContext => useContext(TaskContext);
