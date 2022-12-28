import { FC, useState } from "react";
import { motion, AnimationProps } from "framer-motion";
import { Task } from "@types";
import { useTask } from "@contexts/taskContext";

interface TaskItemProps {
  data: Task;
}

const taskItemAnimation: AnimationProps = {
  initial: { x: -30 },
  animate: { x: 0 },
  exit: {
    x: 30,
    transition: {
      duration: 0.1,
    },
  },
};

const TaskItem: FC<TaskItemProps> = ({ data }) => {
  const { removeTask } = useTask();

  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [isUpdating, setUpdating] = useState<boolean>(false);

  const handleDeleteTask = async (taskId: Task["id"]) => {
    try {
      setDeleting(true);
      return data;
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteClick = async () => {
    const taskDeleted = await handleDeleteTask(data.id);
    if (taskDeleted) removeTask(taskDeleted.id);
  };

  return (
    <motion.li {...taskItemAnimation} layout>
      {data.name} <button onClick={handleDeleteClick}>delete</button>
    </motion.li>
  );
};

export default TaskItem;
