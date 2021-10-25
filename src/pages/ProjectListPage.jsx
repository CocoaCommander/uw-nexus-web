const PLPColOne = () => {
    return (
        <>
            <button>Create a project</button>
            <div>
                <h3>All Projects</h3>
                <p>Favorites</p>
                <p>Your Projects</p>
            </div>
        </>
    )
}

const ProjectListPage = () => {
    return (
        <div className="plp-container">
            <div className="plp-col">
                <PLPColOne/>
            </div>
            <div className="plp-col">

            </div>
        </div>
    );
}

export default ProjectListPage;