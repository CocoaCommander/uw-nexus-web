import ProfileGrid from "../components/ProfileGrid/ProfileGrid";

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
            'Environmentalism',
            'Environmentalism',
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
        bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        resume_file_id: 'idk lmao',
        private: false
    }
}

const Profile = (props) => {
    const { isMobile } = props;

    if (isMobile) { // placeholder for now
        return <>You can only view your profile on desktop.</>;
    }
    return (
        <div>
            <ProfileGrid userInfo={USER_INFO} />
        </div>
    );
}

export default Profile;