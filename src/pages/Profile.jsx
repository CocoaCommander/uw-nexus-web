import ProfileGrid from "../components/Profile/ProfileGrid";
import EditProfile from "../components/Profile/EditProfile";
import { useState } from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import "../Profile.css";

import userPic from '../assets/userpic.png'; // Remove once image endpoints are created

const Profile = (props) => {
    const { userProfile, userCallback } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userID = useSelector((state) => state.userState.userID);
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const [hasResume, setHasResume] = useState(false);
    const [resume, setResume] = useState(null);

    const handleResumeEdit = (resume) => {
      setResume(resume);
      setHasResume(true);
    }
    
    
    useEffect(() => {
      const fetchData = async() => {
        const userID = window.localStorage.getItem("nxs-id");
        const profileID = window.localStorage.getItem(userID);

        // const url = `${process.env.REACT_APP_API_URL}/api/profile/${profileID}`;
        const options = {
          method: 'GET',
          credentials: 'include'
        }


          if (userProfile.education.resume_file_id) {
            setHasResume(true);
            const resumeUrl = `/api/profile/resume/${userProfile.education.resume_file_id}`;
            const resumeResponse = await fetch(resumeUrl, options);
            if (resumeResponse.ok) {
              const resumeData = await resumeResponse.json();
              setResume(resumeData.pdf);
            } else {
              console.log(`Could not fetch user resume! Error = ${resumeResponse.status}`);
            }
          } else {
            console.log("hi");
            setResume("No resume found");
            setHasResume(false);
          }
        } 
        fetchData();
    }, [userProfile]);

    let profileLayout = <ProfileGrid userInfo={userProfile} editCallback={setIsEditing} resume={resume} hasResume={hasResume}/>;
    if (isEditing) {
        profileLayout = <EditProfile userInfo={userProfile} editCallback={setIsEditing} resume={resume} hasResume={hasResume} editResumeCallback={handleResumeEdit}/>;
    }

    return (
        <div>
            {profileLayout}
        </div>
    );
}

export default Profile;