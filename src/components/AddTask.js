import React, { useEffect, useState, useRef } from "react";
import Input from "./Input";
import ListTask from "./ListTask";
import Form from "./Form";
import "react-calendar/dist/Calendar.css";

import axios from "axios";
import "./calendar.css";

function AddTask() {
  const [openTask, setOpenTask] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const initialFormData = {
    task_msg: "Follow up",
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

  const [components, setComponents] = useState([]);

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

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setFormData({ ...formData, task_date: formatDate(date, "-") });
  //   setIsOpen(false);
  // };

  // const handleChange = (selected) => {
  //   setFormData({ ...formData, assigned_user: selected.value });
  //   setSelectedUser(selected);
  // };

  // const handleTimeChange = (selected) => {
  //   setFormData({ ...formData, task_time: selected.value });
  //   setSelectedTime(selected);
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   let response = async () => {
  //     try {
  //       let postTask = await axios({
  //         method: "post",
  //         url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${credentials.company_id}`,
  //         headers: {
  //           Authorization: "Bearer " + credentials.token,
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         data: formData,
  //       });

  //       let result = await axios({
  //         method: "get",
  //         url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${postTask.data.results.id}?company_id=${credentials.company_id}`,
  //         headers: {
  //           Authorization: "Bearer " + credentials.token,
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       setTasks((tasks) => [...tasks, result.data.results]);
  //       setOpenTask(false);
  //       setFormData(initialFormData);
  //       setSelectedTime(null);
  //       setSelectedUser(null);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   response();
  // };

  const handleFormEdit = (data, id, task) => {
    setOpenTask(false);
    let response = async () => {
      try {
        let res = await axios({
          method: "put",
          url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${credentials.company_id}`,
          headers: {
            Authorization: "Bearer " + credentials.token,
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

  const handleAddComponent = () => {
    const id = Date.now();
    setComponents((prevComponents) => [...prevComponents, { id: id }]);
  };

  const handleRemoveComponent = (id) => {
    setComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  return (
    <>
      <Input onClick={handleAddComponent} task={tasks} />
      {components.map((component) => (
        <div key={component.id}>
          <Form
            setTasks={setTasks}
            selectedOptions={selectedOptions}
            onClose={() => handleRemoveComponent(component.id)}
          />
        </div>
      ))}

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
