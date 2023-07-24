import { useState } from "react";
import EditTask from "./EditTask";
import { ReactComponent as Bell } from "../asset/Bell.svg";
import { ReactComponent as Edit } from "../asset/Frame.svg";
import { ReactComponent as Tick } from "../asset/Tick2.svg";
import { Tooltip } from "flowbite-react";

function ListTask({ task, users, handleDelete, handleFormEdit }) {
  const [editTask, setEditTask] = useState(false);
  const [hover, setHover] = useState(false);

  const handleEdit = () => {
    setEditTask(true);
    setHover(false);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const period = hours < 12 ? "am" : "pm";

    const formattedTime = `${formattedHours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${period}`;
    return formattedTime;
  };
  const getFutureDate = (inputDate) => {
    const currentDate = new Date();
    const [year, month, day] = inputDate.split("-");
    const futureDate = new Date(year, month - 1, day);
    if (futureDate > currentDate) {
      return true;
    }
    return false;
  };
  return (
    <>
      {editTask ? (
        <EditTask
          setOpenEdit={setEditTask}
          task={task}
          handleDelete={handleDelete}
          users={users}
          handleFormEdit={handleFormEdit}
        />
      ) : (
        <div
          className="flex justify-between w-[368px] py-2 px-3 border rounded border-[#E5E5E5]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="flex gap-2">
            <img src="Ellipse 1034.svg" alt="Avatar" className="avatarImage" />
            <div className="textWrapper">
              <p className="font-semibold leading-[16px] text-[16px] font-[Segoe UI] text-[262E39]">
                {task.task_msg}
              </p>
              <p
                className="font-normal leading-[16px] text-[11px] font-[Segoe UI] mt-1"
                style={{
                  color: `${getFutureDate(task.task_date) ? "black" : "red"} `,
                }}
              >
                {formatDate(task.task_date)} at {formatTime(task.task_time)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="" style={{ display: hover ? "block" : "none" }}>
              <Tooltip content="Edit this task">
                <i className="" onClick={handleEdit}>
                  <Edit />
                </i>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <i className="img left">
                <Bell />
              </i>
              <i className="img right">
                <Tick />
              </i>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListTask;
