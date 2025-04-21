// import style from "./Doing.module.css";

function Doing({ title, description, priority, usersData, user }) {
    const assignedUser = usersData.find(u => u.name === user);

    return (
        <div>
            <h4 >{title}</h4>
            <p >{description}</p>

            <div >
                <span >
                    {priority}
                </span>
                <span >
                    In Progress
                </span>
            </div>

            {assignedUser && (
                <p >
                    <strong>Assignee:</strong> {assignedUser.name}
                </p>
            )}
        </div>
    );
}

export default Doing;