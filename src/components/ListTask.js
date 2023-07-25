import { useState, useEffect } from "react";
import EditTask from "./EditTask";
import { ReactComponent as Bell } from "../asset/Bell.svg";
import { ReactComponent as Edit } from "../asset/Frame.svg";
import { ReactComponent as Tick } from "../asset/Tick2.svg";
import { Tooltip } from "flowbite-react";

function ListTask({ task, users, handleDelete, handleFormEdit }) {
  const [editTask, setEditTask] = useState(false);
  const [hover, setHover] = useState(false);
  const [crossText, setCrossText] = useState(false);

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
            <img
              src={`${
                "user_665251f54aec4e96b0e3b3b2d196fb73" === task.assigned_user
                  ? "http://www.gravatar.com/avatar/ade5207d5b42c5da595edd78189d7717?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png"
                  : "http://www.gravatar.com/avatar/cf94b74bd41b466bb185bd4d674f032b?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png"
              }`}
              alt="Avatar"
              className="w-[35px] h-[35px] rounded-3xl"
            />
            <div className="textWrapper">
              <p
                className="font-semibold leading-[16px] text-[16px] font-[Segoe UI] text-[262E39]"
                style={{ textDecoration: crossText ? "line-through" : "none" }}
              >
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
              <Tooltip content="Snooze this Task to appear in your Inbox at a later date">
                <i>
                  <Bell />
                </i>
              </Tooltip>
              <Tooltip
                content={`${
                  crossText
                    ? "Mark this task as incomplete"
                    : "Mark this task as done"
                }`}
              >
                <i onClick={() => setCrossText(!crossText)}>
                  {crossText ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                      >
                        <path
                          fill="currentColor"
                          d="M4.309 2A1.75 1.75 0 0 0 2.61 3.326L1.05 9.558c-.035.14-.051.281-.051.424V12.5c0 .965.785 1.75 1.75 1.75h10.5c.965 0 1.75-.785 1.75-1.75V9.982a1.71 1.71 0 0 0-.052-.424l-1.559-6.232A1.75 1.75 0 0 0 11.691 2H4.31Zm0 1.75h7.382L13.004 9h-1.4a.871.871 0 0 0-.782.484l-.391.782a.877.877 0 0 1-.782.484H6.354a.871.871 0 0 1-.782-.484l-.391-.782A.876.876 0 0 0 4.399 9H2.996L4.31 3.75Z"
                        ></path>
                      </svg>
                    </span>
                  ) : (
                    <Tick />
                  )}
                </i>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListTask;
