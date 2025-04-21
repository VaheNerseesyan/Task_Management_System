// import style from "./Done.module.css";

function Done({ title, description, priority, usersData, userId }) {
    const assignedUser = usersData.find(u => u.name === user);
    return (
        <div>
            <h4 className={style.taskTitle}>{title}</h4>
            <p className={style.taskDescription}>{description}</p>

            <div>
                <span >
                    {priority}
                </span>
                <span >
                    Completed
                </span>
            </div>
            {assignedUser && (
                <p>
                    <strong>Assignee:</strong> {assignedUser.name}
                </p>
            )}
        </div>
    );
}

export default Done;