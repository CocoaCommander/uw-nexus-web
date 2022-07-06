import ProfileGrid from "../components/Profile/ProfileGrid";
import EditProfile from "../components/Profile/EditProfile";
import { useState } from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = (props) => {
    const { isMobile, userProfile, userCallback } = props;
    const [isEditing, setIsEditing] = useState(false);
    const userID = useSelector((state) => state.userState.userID);
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    
    useEffect(() => {
      console.log("useEffect in Profile.jsx");

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

          const resumeUrl = `${process.env.REACT_APP_API_URL}/api/profile/resume/${profileData.resume_file_id}`;
          const resumeResponse = await fetch(resumeUrl, options);
          if (resumeResponse.ok) {
            const resumeData = await resumeResponse.json();
            setData(profileData, resumeData);
            console.log(resumeData);
          } else {
            console.log(`Could not fetch user resume! Error = ${resumeResponse.status}`);
          }

        } else {
          console.log(`Could not fetch user profile! Error = ${profileResponse.status}`);
        }
      }
      
      fetchData();
    }, []);

    const setData = (data, resumeData) => {
      console.log("data = " + data._id);
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