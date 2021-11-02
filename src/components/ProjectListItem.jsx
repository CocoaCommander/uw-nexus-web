const ProjectListItem = ({
    id,
    name,
    time,
    size,
    location,
    interests,
    positions
}) => {
    return (
        <>
            <p>{id}</p>
            <p>{name}</p>
        </>
    )
}

export default ProjectListItem;
