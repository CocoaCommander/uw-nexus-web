import ProfileGrid from "../components/Profile/ProfileGrid";
import EditProfile from "../components/Profile/EditProfile";
import { useState } from 'react';

// this'll be passed in as a prop
const USER_INFO = {
    first_name: 'James',
    last_name: 'Lim',
    education: {
        campus: 'Seattle',
        year: 'Junior',
        major: 'Mathematics',
        interests: [
            'Environmentalism',
            'Environmentalism',
            'Activism',
            'Technology',
            'Environmentalism'
        ],
        skills: [
            'CAD',
            'Back-End Software',
            'Back-End Software',
            'Back-End Software',
            'CAD',
            'Back-End Software',
            'Back-End Software',
            'Back-End Software',
            'CAD',
            'Back-End Software',
            'Back-End Software',
            'Back-End Software'
        ],
        bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        resume_file_id: 'idk-lmao.pdf',
        private: false
    }
}

const Profile = (props) => {
    const { isMobile } = props;
    const [userProfile, setUserProfile] = useState(USER_INFO); // This is probably the wrong place to put this
    const [isEditing, setIsEditing] = useState(false);
    
    if (isMobile) { // placeholder for now
        return <>You can only view your profile on desktop.</>;
    }
    let profileLayout = <ProfileGrid userInfo={userProfile} editCallback={setIsEditing} />;
    if (isEditing) {
        profileLayout = <EditProfile userInfo={userProfile} editCallback={setIsEditing} />;
    }
    return (
        <div>
            {profileLayout}
        </div>
    );
}

export default Profile;