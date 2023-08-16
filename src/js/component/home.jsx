import React, { useState, useEffect } from "react";
const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/mery"
//create your first component
const Home = () => {
    //escribiendo
    const [task, setTask] = useState({
        "label": "",
        "done": false
    })
    //todas las tareas
    const [taskList, setTaskList] = useState([])
    const handleChange = (event) => {
        setTask({
            ...task, //expred operator
            "label": event.target.value
        })
    }
    const handleDelete = (label) => {
        const newTasklist = taskList.filter ((item) => item.label !== label ); 
        uptasklist (newTasklist);
    }
    const uptasklist = async (newlist) => {
            try {
                let response = await fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(newlist)
                })
                if (response.ok) {
                    setTaskList(
                       newlist
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
    
    const saveTask = async (event) => {
        if (event.key == "Enter") {
            try {
                let response = await fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify([...taskList, task])
                })
                if (response.ok) {
                    getTask()
                    setTask(
                        {
                            "label": "",
                            "done": false
                        }
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const getTask = async () => {
        try {
            let response = await fetch(API_URL)
            if (response.ok) {
                let data = await response.json()
                setTaskList(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTask()
    }, [])
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <h1>Todo List</h1>
                    <input
                        type="text"
                        placeholder="Agrega la tarea"
                        className="form-control"
                        name="label"
                        value={task.label}
                        onChange={handleChange}
                        onKeyDown={saveTask}
                    />
                    <ul>
                        {taskList.map((item, index) => {
                            return (
                                <li key={index}>{item.label}
                                <button className="btn btn-danger ms-4 mt-2" onClick={() => handleDelete (item.label)}>
                                    x
                                </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Home;