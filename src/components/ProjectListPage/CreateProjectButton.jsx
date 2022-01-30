import { ReactComponent as PlusIcon} from '../../assets/akar-icons_plus.svg'

const CreateProjectButton = () => {
    return (
        <>
            <button className="create-project-button">
                <PlusIcon />
                Create a Project
            </button>
        </>
    )
}

export default CreateProjectButton;
