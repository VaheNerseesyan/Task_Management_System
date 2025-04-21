// import style from "./AddModal.module.css";

function AddModal({
    titleInput,
    descriptionInput,
    status,
    priority,
    user,
    usersData,
    handleTitleInputChange,
    handleDescriptionInputChange,
    handleStatusChange,
    handlePriorityChange,
    handleUserChange,
    addTask,
    toggleAddMode
}) {
    return (
        <>
            <div>
                <label>Title</label>
                <input
                    value={titleInput}
                    onChange={handleTitleInputChange}
                    type="text"
                    placeholder="Enter task title"
                />
            </div>
            <div >
                <label>Description</label>
                <input

                    value={descriptionInput}
                    onChange={handleDescriptionInputChange}
                    type="text"
                    placeholder="Enter task description"
                />
            </div>
            <div >
                <label >Status</label>
                <select
                    name="status"
                    value={status}
                    onChange={handleStatusChange}
                >
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div >
                <label>Priority</label>
                <select
                    name="priority"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label>
                    Assign User:
                    <select name="user" value={user} onChange={handleUserChange}>
                        <option value="">Select a user</option>
                        {usersData.map((user) => (
                            <option key={user.userId} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <button onClick={() => {
                addTask();
                toggleAddMode();
            }}>
                Create Task
            </button>
        </>
    );
}

export default AddModal;