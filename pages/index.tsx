import { NextPage } from "next";
import TaskForm from "@components/TaskForm";
import TaskList from "@components/TaskList";

const HomePage: NextPage = () => {
  return (
    <main className="container max-w-md pt-10 pb-20">
      <h1 className="text-4xl text-blue-400 font-bold">Simple Todolist</h1>
      <hr className="my-4" />
      <TaskForm />
      <hr className="my-4" />
      <TaskList />
    </main>
  );
};

export default HomePage;
