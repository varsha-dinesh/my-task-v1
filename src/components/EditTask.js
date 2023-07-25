import { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import Calendar from "react-calendar";
import { timeOptions } from "./ListOptions";
import { Tooltip } from "flowbite-react";
import "react-calendar/dist/Calendar.css";
import { ReactComponent as RightArrwow } from "../asset/arrowRight.svg";
import { ReactComponent as LeftArrow } from "../asset/LeftArrow.svg";
import { ReactComponent as Group } from "../asset/Group 8143.svg";
import { ReactComponent as Vector } from "../asset/Vector.svg";
import { ReactComponent as Delete } from "../asset/Delete.svg";
import { ReactComponent as Time } from "../asset/Time.svg";
import "./calendar.css";

function EditTask({ setOpenEdit, task, users, handleDelete, handleFormEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(users);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({
    value: 0,
    label: "00:00am",
  });
  const [selectedUser, setSelectedUser] = useState({});
  const [formData, setFormData] = useState({
    task_msg: "",
    task_date: formatDate(selectedDate, "-"),
    task_time: selectedTime,
    assigned_user: selectedUser,
    is_completed: 0,
    time_zone: Math.abs(new Date().getTimezoneOffset() * 60),
  });
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
    setFormData({
      ...formData,
      task_msg: task.task_msg,
      task_date: task.task_date,
    });
    setSelectedTime(() => time(task.task_time));
    setSelectedUser(() => value(task.assigned_user));
  }, []);

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

  const formatingDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const time = (value) => {
    let newArr = {};
    timeOptions.map((time) => {
      if (time.value === value) {
        newArr.value = time.value;
        newArr.label = time.label;
      } else {
        return {};
      }
    });
    return newArr;
  };

  const value = (value) => {
    let newArr = {};
    selectedOptions.map((option) => {
      if (option.value === value) {
        newArr.label = option.label;
        newArr.value = option.value;
      } else {
        return {};
      }
    });
    return newArr;
  };

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
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      border: state.isFocused ? "none" : "none  ",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      fontSize: "16px",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      border: "1px solid #e5e5e5",
      boxShadow: "none",
    }),

    menuList: (provided) => ({
      ...provided,
      position: "relative",
      padding: 0,
      zIndex: 9999,
      margin: "8px 0"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "" : "",
      color: state.isSelected ? "#262E39" : "#262E39",
      zIndex: 9999,
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
      marginTop: "1px",
      borderColor: state.isFocused ? "rgba(82, 168, 236, 0.8)" : "#e5e5e5",
      border: state.isFocused ? "none" : "",
      outline: state.isFocused ? "none" : "",
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      paddingLeft: "20px",
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
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      padding: "0 2px",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      fontSize: "16px",
      border: "none",
      paddingLeft: "23px",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      paddingLeft: "20px",
    }),
  };

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <Time />
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

  const CustomMenu = (props) => {
    return (
      <>
        <div className="relative">
          <div className="absolute z-[99999] h-3 w-3 rotate-45 ml-[1.2rem] mt-[6px] border-l border-t border-[#e3e8ee] bg-white"></div>

        </div>
        <div className="mt-1">
          <components.Menu {...props}>{props.children}</components.Menu>
        </div>
      </>
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    task.task_msg = formData.task_msg;
    task.task_time = selectedTime ? selectedTime.value : formData.task_time;
    task.task_date = formData.task_date;
    task.assigned_user = selectedUser ? selectedUser.value : task.assigned_user;
    const result = {
      ...formData,
      task_time: selectedTime ? selectedTime.value : formData.task_time,
      assigned_user: selectedUser ? selectedUser.value : task.assigned_user,
    };
    handleFormEdit(result, task.id, task);
    setOpenEdit(false);
  };

  return (
    <>
      <div className="w-[368px] h-[311] bg-[#EDF7FC] p-3 border rounded border-[#E5E5E5]">
        <p className="font-normal leading-[16px] text-[16px] font-[Segoe UI] text-[262E39] mb-2">
          Task description
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
          <div className="flex flex-2 gap-2 mb-2">
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
                  value={formatingDate(formData.task_date, "/")}
                  onChange={handleDateChange}
                  className="w-[160px] h-[38px] border rounded border-[#E5E5E5] mt-[1px] text-[16px]  pl-[30px]"
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
          {isOpen && (
            <div ref={calendarRef} className="relative">
              <div className="absolute z-[99999] h-3 w-3 rotate-45 mt-[1px] ml-[4.2rem] border-l border-t border-[#e3e8ee] bg-white"></div>
              <Calendar
                onChange={handleDateChange}
                value={formData.task_date}
                formatMonth={(locale, date) => formatDate(date, "MMM")}
                prevLabel={<LeftArrow />}
                nextLabel={<RightArrwow />}
                formatShortWeekday={(locale, date) => formatDate(date, "dd")}
                showNeighboringMonth={false}
                locale={{ weekStartsOn: 0 }}
                calendarType={"US"}
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
              className="react-select-container"
              classNamePrefix="react-select"
              components={{
                Option: CustomOption,
                DropdownIndicator: CustomDropdownIndicator,
                IndicatorSeparator,
                Menu: CustomMenu,

              }}
            />
          </div>
          <div className="flex justify-between mt-4 items-center">
            <Tooltip content="Delete Task" className="px-2">
              <i
                className="cursor-pointer"
                onClick={() => handleDelete(task.id)}
              >
                <Delete />
              </i>
            </Tooltip>
            <div>
              <button
                className="cursor-pointer mr-4 font-normal leading-[16px] text-[14px] font-[Segoe UI] outline-none focus:outline-none"
                onClick={() => setOpenEdit(false)}
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
    </>
  );
}

export default EditTask;
