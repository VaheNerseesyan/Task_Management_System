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
        <div className={`${style.taskCard} ${style[`${status}Card`]}`} data-status={status}>
            {!isEditMode ? (
                <>
                    <div>
                        <h4 className={style.taskTitle}>{title}</h4>
                        <p className={style.taskDescription}>{description}</p>

                        <div className={style.taskMeta}>
                            <span className={`${style.taskBadge} ${style[`priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`]}`}>
                                {priority} Priority
                            </span>
                        </div>

                        {assignedUser && (
                            <div className={style.assignee}>
                                <div>
                                    <span className={style.assigneeLabel}>Assigned to:</span>
                                    <span className={style.assigneeName}>{assignedUser.name}</span>
                                </div>
                            </div>
                        )}

                    </div>
                    
                    <div className={style.taskButtons}>
                        <button className={`${style.button} ${style.deleteButton}`} onClick={() => handleDeleteTask(id)}>
                            Delete
                        </button>
                        <button className={`${style.button} ${style.editButton}`} onClick={handleEditMode}>
                            Edit
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
