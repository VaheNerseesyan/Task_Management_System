import style from "./Doing.module.css";

function Doing({ id, title, description, priority, status, usersData, user, handleDeleteTask }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const assignedUser = usersData.find(u => u.name === user);

    const handleEditMode = () => {
        setIsEditMode(!isEditMode);
    }

    return (
        <div className={`${style.taskCard} ${style[`${status}Card`]}`} data-status={status}>
                    {}
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
                </div>
    );
}

export default Doing;