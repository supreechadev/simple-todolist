import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from "react";
import { motion, AnimationProps } from "framer-motion";
import { Task, TaskStatusEnum, TaskStatusId } from "@types";
import { useTask } from "@contexts/taskContext";
import StatusCircle from "@components/StatusCircle";
import TashIcon from "@components/icons/TashIcon";
import PencilSquareIcon from "@components/icons/PencilSquareIcon";
import CheckIcon from "@components/icons/CheckIcon";
import MinusIcon from "@components/icons/MinusIcon";

interface TaskItemProps {
  data: Task;
}

const taskItemAnimation: AnimationProps = {
  exit: {
    x: 30,
    transition: {
      duration: 0.1,
    },
  },
};

const TaskItem: FC<TaskItemProps> = ({ data }) => {
  const { removeTask, updateTask } = useTask();

  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Task>({ ...data });
  const [tempName, setTempName] = useState<Task["name"]>("");
  const [isEditing, setEditing] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [isUpdating, setUpdating] = useState<boolean>(false);

  const handleDeleteTask = async (taskId: Task["id"]) => {
    try {
      setDeleting(true);
      const delay = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      await delay;
      return data;
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      setUpdating(true);
      const delay = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      await delay;
      return task;
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = async () => {
    const taskDeleted = await handleDeleteTask(data.id);
    if (taskDeleted) removeTask(taskDeleted.id);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "NumpadEnter" || e.code === "Enter") {
      closeEditMode();
    }
  };

  const openEditMode = () => {
    setTempName(form.name);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    setEditing(true);
  };

  const closeEditMode = async () => {
    if (tempName !== form.name) {
      const taskUpdated = await handleUpdateTask(form);
      if (taskUpdated) {
        updateTask(taskUpdated);
      }
    }
    setEditing(false);
  };

  const handleStatusChange = async () => {
    const newStatus = data.statusId + 1;
    const updatedTask = {
      ...data,
      statusId: newStatus > 3 ? 1 : (newStatus as TaskStatusId),
    };
    setForm(updatedTask);
    updateTask(updatedTask);
  };

  return (
    <motion.li
      {...taskItemAnimation}
      layout
      className="py-2 border-b last:border-b-transparent flex gap-x-2"
    >
      <StatusCircle statusId={data.statusId} />
      {isEditing ? (
        <input
          ref={inputRef}
          value={form.name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          onBlur={closeEditMode}
          disabled={isUpdating}
          className="grow focus:outline-none focus:bg-slate-100 disabled:opacity-50"
          type="text"
        />
      ) : (
        <span
          onClick={handleStatusChange}
          className={`grow cursor-pointer ${
            data.statusId === TaskStatusEnum.DONE ? "line-through" : ""
          }`}
        >
          {data.name}
          {data.statusId === TaskStatusEnum.INPROGRESS ? "..." : ""}
        </span>
      )}
      <div className="flex gap-x-2 shrink-0">
        <button
          className="disabled:opacity-50"
          disabled={isDeleting || isUpdating}
          type="button"
          onClick={() => (isEditing ? closeEditMode() : openEditMode())}
        >
          {isEditing ? (
            <>
              {isUpdating ? (
                <MinusIcon className="h-4 w-4 animate-spin" />
              ) : (
                <CheckIcon className="h-4 w-4" />
              )}
            </>
          ) : (
            <PencilSquareIcon className="h-4 w-4" />
          )}
        </button>
        <button
          className="disabled:opacity-50"
          type="button"
          disabled={isDeleting || isEditing || isUpdating}
          onClick={handleDeleteClick}
        >
          {isDeleting ? (
            <MinusIcon className="h-4 w-4 animate-spin" />
          ) : (
            <TashIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
