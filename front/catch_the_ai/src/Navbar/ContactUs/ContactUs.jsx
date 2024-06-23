import React from "react";
import { useState, useEffect } from "react";
import { BASE_DOMAIN_URL } from '../../index';
function ContactUs() {
    const [message_, setMessage] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { name, email, message } = message_
    const handleChange = (e) => {
        setMessage({ ...message_, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(message_);
        // disable the button
        setIsSubmitting(true);


        // send the email
        sendEmail();

    }
    const sendEmail = async () => {
        const url = BASE_DOMAIN_URL + "/send_contact_us_email/";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message_),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    throw new Error("Something went wrong");
                }
            })

            .then((data) => {
                // console.log(data);
                if (data.status == 1) {
                    setMessage({
                        name: "",
                        email: "",
                        message: "",
                    });
                    appendAlert("Message sent successfully", "success");

                }
                else {
                    console.log("error");
                }
                setIsSubmitting(false);
            }
            )
            .catch((err) => console.log(err));
    }
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    return (
        <div className="container mb-5 mt-5">
            <h3 className="mb-4 text-light" style={{}}>Contact Us</h3>
            <div className=" mt-0 w-100">
                <div className="row">
                    {/*  first column */}
                    <div className="col-12 col-sm-4 " >
                        <p className="text-light">Contact me</p>
                        <p><i className="bi bi-geo-alt text-light"> Cairo, Egypt</i></p>
                        <p><i className="bi bi-phone text-light"> +20 105 584 098</i></p>
                        <p><i className="bi bi-envelope"> <a className="text-light"
                            href="mailto:catchtheai@gmail.com">catchtheai@gmail.com</a></i></p>
                    </div>

                    
                    {/*  second column  */}
                    <div className="col-12 col-sm-8 ">
                    <div className="container m-0 p-0 mb-3" id="liveAlertPlaceholder">
                        
                    </div>
                        <div >
                            {/* <!-- nested row  --> */}
                            <div className="row ">
                                <div className="col-12 col-sm-6 mb-2">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                                        <input type="text" className="form-control" value={name} onChange={handleChange} name="name" placeholder="Name" aria-label="name"
                                            aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mt-xs-3 mb-2 ">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                        <input type="email" className="form-control" value={email} onChange={handleChange} placeholder="Email" name="email" aria-label="Username"
                                            aria-describedby="basic-addon1" />
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-3  ">
                                <div className="col-12">
                                    <label htmlFor="message" className="form-label"></label>
                                    <textarea className="form-control" value={message} onChange={handleChange} name="message" rows="5" placeholder="Your message"></textarea>
                                </div>
                            </div>
                            <div className=" text-center">
                                <button className="btn text-center" disabled={isSubmitting} onClick={handleSubmit} style={{ backgroundColor: "#DDA0DD", width: "150px" }}><i
                                    className="bi bi-send"> Send</i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;