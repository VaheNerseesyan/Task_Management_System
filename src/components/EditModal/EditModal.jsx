import { useState } from "react";
import style from "./EditModal.module.css";

function EditModal({
    id,
    title,
    description,
    priority,
    status,
    usersData,
    editTask,
    handleEditMode,
    assignedUser
}) {
    const [titleInput, setTitleInput] = useState(title);
    const [descriptionInput, setDescriptionInput] = useState(description);
    const [statusInput, setStatusInput] = useState(status);
    const [priorityInput, setPriorityInput] = useState(priority);
    const [userInput, setUserInput] = useState(assignedUser);

    const handleSave = () => {
        editTask(
            id,
            titleInput,
            descriptionInput,
            userInput,
            priorityInput,
            statusInput
        );
        handleEditMode();
    };

    return (
        <div className={style.modalBackdrop}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <h2 className={style.modalTitle}>Edit Task</h2>
                    <button
                        className={style.closeButton}
                        onClick={handleEditMode}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Task Title*</label>
                    <input
                        className={style.formInput}
                        type="text"
                        value={titleInput}
                        onChange={e => setTitleInput(e.target.value)}
                        required
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Description</label>
                    <textarea
                        className={style.formTextarea}
                        value={descriptionInput}
                        onChange={e => setDescriptionInput(e.target.value)}
                        rows={4}
                        maxLength={500}
                    />
                    <div className={style.charCount}>
                        {descriptionInput.length}/500
                    </div>
                </div>

                <div className={style.formGroup}>
                    <label className={style.formLabel}>Status</label>
                    <select
                        className={style.formSelect}
                        value={statusInput}
                        onChange={e => setStatusInput(e.target.value)}
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
                        value={priorityInput}
                        onChange={e => setPriorityInput(e.target.value)}
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
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                    >
                        <option value="">Select team member</option>
                        {usersData.map(u => (
                            <option key={u.userId} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={style.buttonRow}>
                    <button
                        className={style.cancelButton}
                        onClick={handleEditMode}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className={style.submitButton}
                        onClick={handleSave}
                        disabled={!titleInput.trim()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;