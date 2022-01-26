import React, {useState} from "react";
import { ReactComponent as divideImage} from './visPanel.svg';

function Button(props){
    const landingPage = `button ${props.type}`
    return(
    <button className={myClass} onClick={props.handleClick}>{props.children}</button>
    )
}

const buttonSeperateOne = () => {

    return (
        <>
        <p>If you are looking to get recruited for a project</p>
        <Button handleClick={handlePageChange} label="Join the Network" type="secondary"/>
        </>
    )
}

const buttonSeperateTwo = () => {

    return (
        <>
        <p>If you are looking for a side project</p>
        <Button handleClick={handlePageChange} label="Find your Project" type="secondary"/>
        </>
    )
}

const buttonSeperateThree = () => {

    return (
        <>
        <p>If you are recruiting for your dream project</p>
        <Button handleClick={handlePageChange} label="Create your Project" type="secondary"/>
        </>
    )
}

const firstPart = () => {

    return (
        <>
        <div>
            <h4>Find your next passion project</h4>
                <h5>Discover self-motivated students on the NEXUS Network</h5>
                <Button handleClick={handlePageChange} label="Find your Project" type="primary"/>
                <Button handleClick={handlePageChange} label="Browse Betwork" type="secondary"/>
            <divideImage />
        </div>
        </>

    );
}

const secondPart = () => {

    return (
        <>
        <div>
            <h6>what we do here at NEXUS</h6>
                <div>
                    <buttonSeperateOne />
                    <buttonSeperateTwo />
                    <buttonSeperateThree />
                </div>
            <h7>The Nexus Network</h7>
            <p>Join the community of self-motivated and driven students.
                Find a teammate or explore side project opportunities.
                Lets fuel your future!
            </p>
        </div>
        </>
    );
}