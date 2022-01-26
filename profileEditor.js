
export default({uid, firstName, lastName, campus, year, major, interests, skills, bio}) => {
    userRef.child(uid).set({
        firstName,
        lastName,
        campus,
        year,
        major,
        interests,
        skills,
        bio,
    }).then(data=>{
        console.log(data)
        return true;
    }).catch(()=>{
        console.log(error)
        return false;
    });
};