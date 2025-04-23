import { useState } from "react";
import EditModal from "../EditModal/EditModal";
import style from "./TaskCard.module.css";

function TaskCard({ id, title, description, priority, status, usersData, user, handleDeleteTask, editTask }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const assignedUser = usersData.find(u => u.name === user);

    const handleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <div className={`${style.taskCard} ${style[status]}`}>
            {!isEditMode ? (
                <>
                    <div className={style.taskHeader}>
                        <div className={style.priorityIndicator} data-priority={priority}></div>
                        <h4 className={style.taskTitle}>{title}</h4>
                    </div>
                    
                    <p className={style.taskDescription}>{description}</p>

                    <div className={style.taskMeta}>
                        <span className={`${style.taskBadge} ${style[priority]}`}>
                            {priority} Priority
                        </span>
                        <span className={`${style.statusBadge} ${style[status]}`}>
                            {status}
                        </span>
                    </div>

                    {assignedUser && (
                        <div className={style.assignee}>
                            <span className={style.assigneeLabel}>Assigned to:</span>
                            <span className={style.assigneeName}>{assignedUser.name}</span>
                        </div>
                    )}
                    
                    <div className={style.taskButtons}>
                        <button className={`${style.button} ${style.editButton}`} onClick={handleEditMode}>
                            Edit
                        </button>
                        <button className={`${style.button} ${style.deleteButton}`} onClick={() => handleDeleteTask(id)}>
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <EditModal
                    editTask={editTask}
                    id={id}
                    assignedUser={assignedUser?.name || ""}
                    title={title}
                    description={description}
                    priority={priority}
                    status={status}
                    usersData={usersData}
                    handleEditMode={handleEditMode}
                />
            )}
        </div>
    );
}

export default TaskCard;