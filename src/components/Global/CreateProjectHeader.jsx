import { ReactComponent as PlusIcon } from '../../assets/akar-icons_plus.svg';
import { Link } from 'react-router-dom';
import './header.css';

const CreateProjectHeader = ({
    isMobile
}) => {
    // App.css is cursed
    return (
        <>
            <Link to={"/createProject"} className="create-project-header">
                <div className="create-project-header-container">
                    <PlusIcon className=''/>
                    <p>Create a Project</p>
                </div>
            </Link>
        </>
    )
}

export default CreateProjectHeader;
