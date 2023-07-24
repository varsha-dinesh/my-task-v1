import React, { useEffect, useState, useRef } from "react";
import Input from "./Input";
import ListTask from "./ListTask";
import Select, { components } from "react-select";
import { BiSearchAlt } from "react-icons/bi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import Calendar from "react-calendar";
import { timeOptions } from "./ListOptions";
import "react-calendar/dist/Calendar.css";
import { ReactComponent as RightArrwow } from "../asset/arrowRight.svg";
import { ReactComponent as LeftArrow } from "../asset/LeftArrow.svg";
import { ReactComponent as Group } from "../asset/Group 8143.svg";
import { ReactComponent as Vector } from "../asset/Vector.svg";
import axios from "axios";
import "./calendar.css";

function AddTask() {
  const [openTask, setOpenTask] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const initialFormData = {
    task_msg: "",
    task_date: formatDate(selectedDate, "-"),
    task_time: "",
    assigned_user: "",
    is_completed: 0,
    time_zone: Math.abs(new Date().getTimezoneOffset() * 60),
  };
  const [formData, setFormData] = useState(initialFormData);
  const [credentials, setCredentials] = useState({
    company_id: "company_0f8d040401d14916bc2430480d7aa0f8",
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODkyMTEwMjYsIm5iZiI6MTY4OTIxMTAyNiwianRpIjoiY2MyMTgzYjEtZWZhNS00ODhkLThiMTUtYTkxZTEyYWNlOGMyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.D5XrrXnVtKA_qV-0FJqtxFOUeC9QPCf9d2a69ePPfGk",
    user_id: "user_8c2ff2128e70493fa4cedd2cab97c492",
  });
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const currentMonthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const currentMonthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);


  const calendarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let getTasks = async () => {
      try {
        let result = await axios({
          method: "get",
          url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${credentials.company_id}`,
          headers: {
            Authorization: "Bearer " + credentials.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setTasks(result.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    let getUsers = async () => {
      try {
        let response = await axios({
          method: "get",
          url: `https://stage.api.sloovi.com/team?product=outreach&company_id=${credentials.company_id}`,
          headers: {
            Authorization: "Bearer " + credentials.token,
          },
        });

        setUsers(response.data.results.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTasks();
    getUsers();
  }, []);

  useEffect(() => {
    const options = users.map((user) => {
      return {
        label: user.name,
        value: user.user_id,
      };
    });
    setSelectedOptions(options);
  }, [users]);

  function formatDate(d, s) {
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (s === "MMM") {
      return d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    }
    if (s === "dd") {
      return d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2);
    }
    if (s === "/") {
      return [month, day, year].join("/");
    }
    return [year, month, day].join("-");
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, task_date: formatDate(date, "-") });
    setIsOpen(false);
  };

  const handleChange = (selected) => {
    setFormData({ ...formData, assigned_user: selected.value });
    setSelectedUser(selected);
  };

  const handleTimeChange = (selected) => {
    setFormData({ ...formData, task_time: selected.value });
    setSelectedTime(selected);
  };

  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      width: "334px",
      height: "31px",
      border: "1px solid #e5e5e5",
      borderColor: state.isFocused ? "rgba(82, 168, 236, 0.8)" : "#e5e5e5",
      boxShadow: state.isFocused
        ? "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.3)"
        : "",
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      border: state.isFocused ? "none" : "none  ",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      fontSize: "16px",
    }),

    menuList: (provided) => ({
      ...provided,
      position: "relative",
      padding: 0,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "" : "",
      color: state.isSelected ? "#262E39" : "#262E39",
      paddingLeft: "12px",
    }),
    dropdownIndicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
      backgroundColor: "#FF0000",
      height: "2px",
      margin: "5px 0",
    }),
  };

  const timeStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      width: "166px",
      height: "30px",
      border: state.isFocused ? "none" : "",
      outline: state.isFocused ? "none" : "",
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),
    inputContainer: (baseStyles, state) => ({
      ...baseStyles,
      width: "100px",
      paddingLeft: "20px",
      border: state.isFocused ? "none" : "",
      outline: state.isFocused ? "none" : "",
    }),

    option: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isSelected ? "#fff" : "#262E39",
      padding: "5px",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: "100px",
      margin: "0",
    }),
    menuList: (baseStyles, state) => ({
      ...baseStyles,
      height: "253px",
      backgroundColor: state.isSelected ? "#fff" : "#fff",
      fontSize: "14px",
      padding: "0",
      margin: "0",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      right: "133px",
      color: "#262E39",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      fontSize: "16px",
      border: "none",
      paddingLeft: "20px",
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      fontSize: "16px",
      border: "none",
      paddingLeft: "20px",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      paddingLeft: "20px",
    }),
  };

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <BiTimeFive />
    </components.DropdownIndicator>
  );

  const CustomOption = ({ children, ...props }) => {
    const icon = props.isSelected ? (
      <img src="Tick.svg" alt="" className="tick" />
    ) : null;

    return (
      <div className={`custom-option ${props.isSelected ? "selected" : " "}`}>
        <components.Option {...props}>
          <div
            className={`custom-option ${
              props.isSelected ? "selected" : "notSelected"
            }`}
          >
            {icon}
            {children}
          </div>
        </components.Option>
      </div>
    );
  };

  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <BiSearchAlt size={15} />
      ) : (
        <>
          <div className="group">
            <Group />
          </div>
          <div className="vector">
            <Vector />
          </div>
        </>
      )}
    </components.DropdownIndicator>
  );

  const IndicatorSeparator = ({ innerProps }) => {
    return <span style={{ display: "none" }} {...innerProps} />;
  };

  const isPreviousMonthDay = (date) => {
    // Get the first day of the current month
    const currentMonthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    // Compare the date's month and year with the current month and year
    return date.getMonth() < currentMonthStart.getMonth() || date.getFullYear() < currentMonthStart.getFullYear();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let response = async () => {
      try {
        let postTask = await axios({
          method: "post",
          url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${credentials.company_id}`,
          headers: {
            Authorization: "Bearer " + credentials.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: formData,
        });

        let result = await axios({
          method: "get",
          url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${postTask.data.results.id}?company_id=${credentials.company_id}`,
          headers: {
            Authorization: "Bearer " + credentials.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        setTasks((tasks) => [...tasks, result.data.results]);
        setOpenTask(false);
        setFormData(initialFormData);
        setSelectedTime(null)
        setSelectedUser(null)
      } catch (err) {
        console.log(err);
      }
    };
    
    response();
  };


  const handleFormEdit = (data, id, task) => {
    setOpenTask(false);
    let response = async () => {
      try {
        let res = await axios({
          method: "put",
          url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${credentials.company_id}`,
          headers: {
            Authorization: "Bearer " + credentials.token    ,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: data,
        });

        setTasks((tasks) =>
          tasks.map(function (elem) {
            return elem.id === task.id ? task : elem;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    response();
  };

  const handleDelete = (id) => {
    let response = async () => {
      try {
        let response = axios({
          method: "delete",
          url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${credentials.company_id}`,
          headers: {
            Authorization: "Bearer " + credentials.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setTasks((tasks) =>
          tasks.filter(function (elem) {
            return elem.id !== id;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (window.confirm("Are you sure you want to delete this task")) {
      response();
    }
  };

  const customLocale = {
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  return (
    <>
      <Input onClick={() => setOpenTask(!openTask)} task={tasks} />
      {openTask && (
        <div className="w-[368px] h-[311] bg-[#EDF7FC] p-3 border rounded border-[#E5E5E5]">
          <p className="font-normal leading-[16px] text-[16px] font-[Segoe UI] text-[262E39] mb-2 ">
            Task Description
          </p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="w-[335px] h-[38px] border rounded border-[#E5E5E5] mb-2 text-[16px] pl-2"
              value={formData.task_msg}
              onChange={(e) =>
                setFormData({ ...formData, task_msg: e.target.value })
              }
            />

            <div className="flex gap-2 mb-2">
              <div className="flex flex-col">
                <label className="font-normal leading-[16px] text-[16px] font-[Segoe UI] text-[262E39]">
                  Date
                </label>
                <div className="relative">
                  <span
                    className="absolute top-3 left-2"
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                  >
                    <FaRegCalendarAlt />
                  </span>
                  <input
                    type="text"
                    value={selectedDate ? formatDate(selectedDate, "/") : ""}
                    onChange={handleDateChange}
                    className="w-[160px] h-[37px] border rounded border-[#E5E5E5] mt-[1px] text-[16px]  pl-[30px]"
                    onFocus={() => {
                      setIsOpen(true);
                    }}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-normal leading-[16px] text-[16px] font-[Segoe UI] text-[262E39]">
                  Time
                </label>
                <div>
                  <Select
                    options={timeOptions}
                    value={selectedTime}
                    onChange={handleTimeChange}
                    styles={timeStyles}
                    placeholder="Time"
                    className="react-select-dropdown"
                    classNamePrefix="react-select-1"
                    components={{ DropdownIndicator }}
                  />
                </div>
              </div>
            </div>
            {isOpen && (
              <div ref={calendarRef} className="relative w-[250px] z-[9999]">
                <div className="absolute z-[99999] h-3 w-3 rotate-45 mt-[1px] ml-[4.2rem] border-l border-t border-[#e3e8ee] bg-white"></div>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  formatMonth={(locale, date) => formatDate(date, "MMM")}
                  prevLabel={<LeftArrow />}
                  nextLabel={<RightArrwow />}
                  formatShortWeekday={(locale, date) => formatDate(date, 'dd')}
                  showNeighboringMonth={false}
                  locale={{weekStartsOn : 0}}
                  calendarType={'US'}
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <p>Assign User</p>
              <Select
                options={selectedOptions}
                value={selectedUser}
                onChange={handleChange}
                styles={selectStyle}
                placeholder="Select User"
                className="react-select-container"
                classNamePrefix="react-select"
                components={{
                  Option: CustomOption,
                  DropdownIndicator: CustomDropdownIndicator,
                  IndicatorSeparator,
                }}
              />
            </div>
            <div className="flex justify-end mt-4">
              <div>
                <button
                  className="cursor-pointer mr-4 font-normal leading-[16px] text-[14px] font-[Segoe UI] outline-none border-none focus:outline-none"
                  onClick={() => setOpenTask(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[80px] p-2 rounded-[14.5px] bg-[#1463FF] text-white font-normal leading-[16px] text-[14px] font-[Segoe UI] border-[#1463FF] outline-none focus:outline-none"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <ul>
        {tasks.map((task) => (
          <ListTask
            key={task.id}
            task={task}
            users={selectedOptions}
            handleDelete={handleDelete}
            handleFormEdit={handleFormEdit}
          />
        ))}
      </ul>
    </>
  );
}

export default AddTask;
