import { ReactComponent as PlusIcon } from '../../assets/akar-icons_plus.svg'

const CreateProjectButton = ({
    isMobile
}) => {
    return (
        <>
            <button className="create-project-button">
                <div className="create-project-button-content">
                    <PlusIcon className='.create-project-button-icon'/>
                    {!isMobile ? "Create a project" : ""}
                </div>
            </button>
        </>
    )
}

export default CreateProjectButton;
