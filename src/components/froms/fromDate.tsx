import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "store/task";
import axios from "axios";

const defaultValues = {
  task_id: 4,
  user_id: 1,
  start_date: new Date(),
  end_date: new Date(),
};
function randomDate(start: any, end: any) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomIntFromInterval(min: any, max: any) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function MainFrom() {
  const { addTask, addTasks, tasks } = useTasks() as any;
  const ref = useRef<any>();
  const ref2 = useRef<any>();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    reset();
    const task = {
      ...data,
      start_date: new Date(data?.start_date),
      end_date: new Date(data?.end_date),
      time_zone: new Date().getTimezoneOffset(),
      time_zone_plus30: new Date().getTimezoneOffset() + 30,
    };
    addTask(task);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 w-11/12 ">
        <div>
          <label>Task id</label>
          <input
            type="text"
            {...register("task_id")}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div>
          <label>user id</label>
          <input
            type="text"
            {...register("user_id")}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div>
          <label>Start date</label>
          <input
            type="text"
            {...register("start_date")}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Select a date"
            ref={ref}
            onChange={(e) => console.log(e.target.value)}
            onFocus={() => (ref.current.type = "datetime-local")}
            onBlur={() => (ref.current.type = "text")}
          />
        </div>
        <div>
          <label>End date</label>
          <input
            type="text"
            {...register("end_date")}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Select a date"
            ref={ref2}
            onChange={(e) => console.log(e.target.value)}
            onFocus={() => (ref2.current.type = "datetime-local")}
            onBlur={() => (ref2.current.type = "text")}
          />
        </div>
      </div>
      <div className="flex">
        <button
          className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
        >
          submit
        </button>
        <button
          className="mt-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={async () => {
            const res = await axios.get(
              "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8"
            );
            const _tasks = tasks;
            const _data = res.data.map(() => {
              return {
                task_id: randomIntFromInterval(1, 6),
                user_id: randomIntFromInterval(1, 6),
                start_date: randomDate(new Date(2012, 0, 1), new Date()),
                end_date: randomDate(new Date(2012, 0, 1), new Date()),
                time_zone: new Date().getTimezoneOffset(),
                time_zone_plus30: new Date().getTimezoneOffset() + 30,
              };
            });
            addTasks([..._data, ..._tasks]);
          }}
        >
          refresh
        </button>
      </div>
    </form>
  );
}
