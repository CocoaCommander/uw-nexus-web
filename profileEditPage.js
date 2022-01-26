import React, {useState} from "react";
import profileEditor from "./profileEditor";

function profileEditPage() {

    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [campus, setCampus] = useState("");
    const [year, setYear] = useState("");
    const [major, setMajor] = useState("");
    const [interests, setInterests] = useState("");
    const [skills, setSkills] = useState("");
    const [bio, setBio] = useState("");

        const onSubmit = () => {
            const uid = URLNexusIDCurr
            const data = {
                uid,
                firstName,
                lastName,
                campus,
                year,
                major,
                interests,
                skills,
                bio
            };

            const result = profileEditor(data);

            if(result == true) {
                console.log("User Info Edited");
            }
            if(result == false) {
                console.log("Error");
            }
        };

    return (
        <div>
            <h1>Edit your Profile</h1>
            <div>
                <input value={firstName} onChange={event=>setFirstName(event.target.value)}/>
                <input value={lastName} onChange={event=>setLastName(event.target.value)}/>
                <div>
                    <h2>Education:</h2>
                        <input value={campus} onChange={event=>setCampus(event.target.value)}/>
                        <input value={year} onChange={event=>setYear(event.target.value)}/>
                        <input value={major} onChange={event=>setMajor(event.target.value)}/>
                </div>
                <input value={interests} onChange={event=>setInterests(event.target.value)}/>
                <input value={skills} onChange={event=>setSkills(event.target.value)}/>
                <input value={bio} onChange={event=>setBio(event.target.value)}/>
            </div>
            <button onClick={onSubmit}> Update and Savef</button>
        </div>
    )
};