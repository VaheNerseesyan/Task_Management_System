import { useState } from "react";
import EditModal from "../EditModal/EditModal";
import style from "./Doing.module.css";

function Doing({ id, title, description, priority, status, usersData, user, handleDeleteTask, editTitle, setTasks, editDescription, editUser, editPriority, editStatus }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const assignedUser = usersData.find(u => u.name === user);

    const handleEditMode = () => {
        setIsEditMode(!isEditMode);
    }

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

                <button onClick={() => handleDeleteTask(id)}>Delete Task</button>
            </div>

            <button onClick={handleEditMode}> + </button>
                </>
            ) : (
                <EditModal
                editTitle={editTitle}
                editDescription={editDescription}
                editUser={editUser}
                editPriority={editPriority}
                editStatus={editStatus}
                id={id}
                title={title}
                description={description}
                priority={priority}
                status={status} 
                usersData={usersData}      
                handleEditMode={handleEditMode}
                setTasks={setTasks} 
                />
            )}
            
        </div>
    );
}

export default Doing;