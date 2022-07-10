import ProfileGrid from "../components/Profile/ProfileGrid";
import EditProfile from "../components/Profile/EditProfile";
import { useState } from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import "../Profile.css";

// this'll be passed in as a prop
const USER_INFO = {
    first_name: '',
    last_name: '',
    education: {
        campus: '',
        year: '',
        major: '',
        interests: [],
        skills: [
        ],
        bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        resume_file_id: '',
        private: false,
        profile_id: ''
    }
}

const Profile = (props) => {
    const { isMobile } = props;
    const [userProfile, setUserProfile] = useState(USER_INFO); // This is probably the wrong place to put this
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userID = useSelector((state) => state.userState.userID);
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    
    useEffect(() => {
      setIsLoading(true);
      const fetchData = async() => {

        const userID = window.localStorage.getItem("nxs-id");
        const profileID = window.localStorage.getItem(userID);

        const url = `${process.env.REACT_APP_API_URL}/api/profile/${profileID}`;
        const options = {
          method: 'GET',
          credentials: 'include'
        }


        const profileResponse = await fetch(url, options);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log(`profile data = ${profileData}`)
          const resumeUrl = `${process.env.REACT_APP_API_URL}/api/profile/resume/${profileData.resume_file_id}`;
          const resumeResponse = await fetch(resumeUrl, options);
          if (resumeResponse.ok) {
            const resumeData = await resumeResponse.json();
            setData(profileData, resumeData);
            console.log(`resume data = ${resumeData}`);
          } else {
            console.log(`Could not fetch user resume! Error = ${resumeResponse.status}`);
          }

        } else {
          console.log(`Could not fetch user profile! Error = ${profileResponse.status}`);
        }
        setIsLoading(false);
      }
      fetchData();

    }, []);

    const setData = (data, resumeData) => {
      let newData = {
        first_name: data.first_name,
        last_name: data.last_name,
        education: {
          campus: data.education.campus,
          year: data.education.year,
          major: data.education.major,
          interests: data.interests,
          skills: data.skills,
          bio: data.bio,
          resume_file_id: resumeData.pdf,
          private: data.private,
        },
        profile_id: data._id,
      }
      setUserProfile(newData);
    }

    if (isMobile) { // placeholder for now
        return <>You can only view your profile on desktop.</>;
    }
    let profileLayout = <ProfileGrid userInfo={userProfile} editCallback={setIsEditing} />;
    if (isEditing) {
        profileLayout = <EditProfile userInfo={userProfile} editCallback={setIsEditing} />;
    }

    if (isLoading) {
      return (
      <div className="loading-screen">
        <TailSpin color="#f05a28" height={100} width={100} ariaLabel="Loading"></TailSpin>
      </div>

      )
    }

    return (
        <div>
            {profileLayout}
        </div>
    );
}

export default Profile;