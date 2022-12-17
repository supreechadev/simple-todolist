import { NextPage } from "next";
import { useRef } from "react";
import TaskForm from "@components/TaskForm";
import TaskList from "@components/TaskList";
import { Task } from "@types";

const HomePage: NextPage = () => {
  const taskListRef = useRef<any>(null);

  const handleTaskComplete = (task: Task) => {
    taskListRef.current.unshiftTask(task);
  };

  return (
    <main className="container max-w-md pt-10 pb-20">
      <h1 className="text-4xl text-blue-400 font-bold">Simple Todolist</h1>
      <hr className="my-4" />
      <TaskForm onComplete={handleTaskComplete} />
      <hr className="my-4" />
      <TaskList ref={taskListRef} />
    </main>
  );
};

export default HomePage;
