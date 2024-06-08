import React from "react";
function EmailActivation() {
    // get the username from the url
    const url = window.location.href;
    const username = url.split("/").pop();
    console.log(username);
    return (
        <div className='container' style={{backgroundColor: "#e6d1d0"}}>
            <h1 style={{textAlign:"center"}} >Email Activated succefuly</h1>
            <button className="btn btn-info m-5 fs-5"  > <a href={"/UserProfile/"+username}>GO to your profile</a></button>
        </div>
    );
}
export default EmailActivation;
