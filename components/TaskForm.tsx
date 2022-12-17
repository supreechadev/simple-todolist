import { FC, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PlusCircleIcon from "@components/icons/PlusCircleIcon";
import { TaskServices } from "@api";
import { Task, TaskStatusEnum } from "@types";
import { getUUID } from "@utils";

interface TaskFormProps {
  onComplete?: (newTask: Task) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("please input task name"),
});

const TaskForm: FC<TaskFormProps> = ({ onComplete }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Partial<Task>>({
    resolver: yupResolver(schema),
  });

  const taskName = watch("name");

  const handleCreateTask = async (name: string) => {
    try {
      setLoading(true);
      // const result = await TaskServices.createTask();
      const newTask: Task = {
        id: getUUID(),
        statusId: TaskStatusEnum.TODO,
        name,
      };
      onComplete?.(newTask);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: Partial<Task>) => {
    if (data.name && data.name.trim() !== "") {
      handleCreateTask(data.name);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-gray-600">Add new task</label>
        <div className="flex flex-col">
          <input
            {...register("name")}
            placeholder="type task here..."
            className="border px-3 py-2 rounded text-gray-600"
            type="text"
          />
          {errors?.name && (
            <p className="text-red-400">{errors.name.message}</p>
          )}
        </div>
        <button
          className="self-end bg-blue-400 text-white py-1 px-3 flex items-center space-x-1 rounded hover:brightness-125 hover:shadow disabled:opacity-50"
          disabled={isLoading || !taskName || taskName.trim() === ""}
          type="submit"
        >
          <PlusCircleIcon className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
