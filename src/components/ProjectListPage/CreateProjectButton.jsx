import { ReactComponent as PlusIcon} from '../../assets/akar-icons_plus.svg'

const CreateProjectButton = () => {
    return (
        <>
            <button className="create-project-button">
                <div className="create-project-button-content">
                    <PlusIcon className='.create-project-button-icon'/>
                    Create a Project
                </div>
            </button>
        </>
    )
}

export default CreateProjectButton;
