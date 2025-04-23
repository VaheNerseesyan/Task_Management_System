import style from "./AddModal.module.css";

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
    toggleAddMode,
}) {
    return (
        <div className={style.modalBackdrop}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <h2 className={style.modalTitle}>Create New Task</h2>
                    <button className={style.closeButton} onClick={toggleAddMode}>
                        &times;
                    </button>
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Task Title*</label>
                    <input
                        className={style.formInput}
                        value={titleInput}
                        onChange={handleTitleInputChange}
                        type="text"
                        placeholder="e.g. Implement user dashboard"
                        required
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Description</label>
                    <textarea
                        className={style.formTextarea}
                        value={descriptionInput}
                        onChange={handleDescriptionInputChange}
                        placeholder="Describe the task details..."
                        rows="4"
                        maxLength="500"
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Status</label>
                        <select
                            className={style.formSelect}
                            name="status"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <option value="todo">To Do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Priority</label>
                    <select
                        className={style.formSelect}
                        name="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Assign To</label>
                    <select
                        className={style.formSelect}
                        name="user"
                        value={user}
                        onChange={handleUserChange}
                    >
                        <option value="">Select team member</option>
                        {usersData.map((user) => (
                            <option key={user.userId} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className={style.submitButton}
                    onClick={addTask}
                    disabled={!titleInput || !descriptionInput}
                >
                    Create Task
                </button>
            </div>
        </div>
    );
}

export default AddModal;