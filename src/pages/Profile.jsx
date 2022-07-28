import ProfileGrid from "../components/Profile/ProfileGrid";
import EditProfile from "../components/Profile/EditProfile";
import { useState } from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import "../Profile.css";

const Profile = (props) => {
    const { userProfile, userCallback } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userID = useSelector((state) => state.userState.userID);
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const [hasResume, setHasResume] = useState(false);
    const [resume, setResume] = useState(null);
    
    useEffect(() => {
      const fetchData = async() => {
        const userID = window.localStorage.getItem("nxs-id");
        const profileID = window.localStorage.getItem(userID);

        // const url = `${process.env.REACT_APP_API_URL}/api/profile/${profileID}`;
        const options = {
          method: 'GET',
          credentials: 'include'
        }

        console.log(isLoading);
        // const profileResponse = await fetch(url, options);
        // if (profileResponse.ok) {
          // const profileData = await profileResponse.json();
          if (userProfile.education.resume_file_id) {
            setHasResume(true);
            const resumeUrl = `${process.env.REACT_APP_API_URL}/api/profile/resume/${userProfile.education.resume_file_id}`;
            const resumeResponse = await fetch(resumeUrl, options);
            if (resumeResponse.ok) {
              const resumeData = await resumeResponse.json();
              setResume(resumeData.pdf);
            } else {
              console.log(`Could not fetch user resume! Error = ${resumeResponse.status}`);
            }
          } else {
            setResume("No resume found");
            setHasResume(false);
          }
        } 
        fetchData();
    }, [userProfile]);

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
      userCallback(newData);
    }

    let profileLayout = <ProfileGrid userInfo={userProfile} editCallback={setIsEditing} resume={resume} hasResume={hasResume}/>;
    if (isEditing) {
        profileLayout = <EditProfile userInfo={userProfile} editCallback={setIsEditing} resume={resume} hasResume={hasResume}/>;
    }

      // if (isLoading) {
      //   console.log("LOADING");
      //   return (
      //   <div className="loading-screen">
      //     <TailSpin color="#f05a28" height={100} width={100} ariaLabel="Loading"></TailSpin>
      //   </div>

      //   )
      // }

    return (
        <div>
            {profileLayout}
        </div>
    );
}

export default Profile;