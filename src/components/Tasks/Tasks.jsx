import { useEffect, useReducer, useState } from "react";
import style from "./Tasks.module.css";
import AddModal from "../AddModal/AddModal";
import TaskCard from "../TaskCard/TaskCard";

const usersData = [
    { userId: 1, name: "John Doe" },
    { userId: 2, name: "Jane Smith" },
    { userId: 3, name: "Alice Johnson" },
    { userId: 4, name: "Bob Brown" },
    { userId: 5, name: "Charlie Davis" },
    { userId: 6, name: "Eve Wilson" },
    { userId: 7, name: "Frank Miller" },
    { userId: 8, name: "Grace Lee" },
    { userId: 9, name: "Henry Taylor" },
    { userId: 10, name: "Ivy Anderson" }
];

const actions = {
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: "DELETE_TASK",
    EDIT_TASK: "EDIT_TASK",
    SET_TASKS: "SET_TASKS",
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_TASK":
            return [...state, payload];
        case "DELETE_TASK":
            return state.filter(task => task.id !== payload);
        case 'EDIT_TASK':
            return state.map(task =>
                task.id === payload.id ? {
                    ...task,
                    title: payload.newTitle,
                    description: payload.newDescription,
                    user: payload.newUser,
                    priority: payload.newPriority,
                    status: payload.newStatus
                } : task
            );
        default:
            return state;
    }
};

function Tasks() {
    const [tasks, dispatch] = useReducer(reducer, JSON.parse(localStorage?.getItem("TASKS") ?? "[]"));
    const [isAddMode, setIsAddMode] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [statusInput, setStatusInput] = useState("todo");
    const [priority, setPriorityInput] = useState("low");
    const [userInput, setUserInput] = useState("");
    const [fixedStatus, setFixedStatus] = useState(null);


    const editTask = (id, newTitle, newDescription, newUser, newPriority, newStatus) =>
        dispatch({
            type: actions.EDIT_TASK,
            payload: {
                id,
                newTitle,
                newDescription,
                newUser,
                newPriority,
                newStatus
            }
        });

    const generateId = () => Math.random();

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("TASKS", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("TASKS");
        }
    }, [tasks]);

    const addTask = () => {
        if (titleInput && descriptionInput) {
            dispatch({
                type: actions.ADD_TASK,
                payload: {
                    id: generateId(),
                    title: titleInput,
                    description: descriptionInput,
                    status: statusInput || "todo",
                    priority: priority || "low",
                    user: userInput
                }
            });
            setTitleInput("");
            setDescriptionInput("");
            setStatusInput("");
            setPriorityInput("");
            setUserInput("");
            setIsAddMode(false);
        }
    };

    const toggleAddMode = (status = null) => {
        setIsAddMode(!isAddMode);
        setFixedStatus(status);
        if (status) {
            setStatusInput(status);
        } else {
            setStatusInput("");
        }
    };

    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value);
    };

    const handleDescriptionInputChange = (e) => {
        setDescriptionInput(e.target.value);
    };

    const handleUserChange = (e) => {
        setUserInput(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriorityInput(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusInput(e.target.value);
    };


    const handleDeleteTask = (taskId) => {
        dispatch({ type: actions.DELETE_TASK, payload: taskId });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "todo": return "#3b82f6";
            case "doing": return "#f59e0b";
            case "done": return "#10b981";
            default: return "#6b7280";
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.appTitle}>Task Board</h1>
                <button className={style.addButton} onClick={toggleAddMode}>
                    <span>+</span> Add Task
                </button>
            </div>

            {isAddMode && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <div className={style.modalHeader}>
                            <h2 className={style.modalTitle}>Create Task</h2>
                            <button className={style.closeButton} onClick={toggleAddMode}>
                                ×
                            </button>
                        </div>
                        <AddModal
                            addTask={addTask}
                            usersData={usersData}
                            titleInput={titleInput}
                            descriptionInput={descriptionInput}
                            status={statusInput}
                            priority={priority}
                            user={userInput}
                            handleTitleInputChange={handleTitleInputChange}
                            handleDescriptionInputChange={handleDescriptionInputChange}
                            toggleAddMode={toggleAddMode}
                            handleStatusChange={handleStatusChange}
                            handlePriorityChange={handlePriorityChange}
                            handleUserChange={handleUserChange}
                            isStatusFixed={!!fixedStatus}
                        />
                    </div>
                </div>
            )}

            <div className={style.columns}>
                {["todo", "doing", "done", 'blocked'].map((statusKey) => (
                    <div key={statusKey} className={style.column}>
                        <div className={style.columnHeader} style={{ borderColor: getStatusColor(statusKey) }}>
                            <h3 className={style.columnTitle}>
                                {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
                            </h3>
                            {statusKey !== "blocked" ? (
                                <div className={style.headerRight}>
                                    <span className={style.taskCount}>
                                        {tasks.filter(task => task.status === statusKey).length}
                                    </span>
                                    <button
                                        className={style.columnAddButton}
                                        onClick={() => toggleAddMode(statusKey)}
                                        title="Add Task"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <span className={style.taskCount}>
                                    {tasks.filter(task => task.status === statusKey).length}
                                </span>
                            )}
                        </div>
                        <div className={style.tasksContainer}>
                            {tasks.filter(task => task.status === statusKey).map((task) => (
                                <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    {...task}
                                    usersData={usersData}
                                    handleDeleteTask={handleDeleteTask}
                                    editTask={editTask}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tasks;