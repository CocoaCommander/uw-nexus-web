import { ReactComponent as PlusIcon } from '../../assets/akar-icons_plus.svg';
import { Link } from 'react-router-dom';

const CreateProjectButton = ({
    isMobile
}) => {
    return (
        <>
            <Link to={"/createProject"} className="create-project-button">
                <div className="create-project-button-content">
                    <PlusIcon className='.create-project-button-icon'/>
                    {!isMobile ? "Create a project" : ""}
                </div>
            </Link>
        </>
    )
}

export default CreateProjectButton;
