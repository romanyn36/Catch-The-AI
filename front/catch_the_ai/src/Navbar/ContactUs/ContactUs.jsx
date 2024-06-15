import React from "react";

function ContactUs() {

    return (
        <div className="container ">
            <h3 className="mb-4 text-light" style={{}}>Contact Us</h3>
            <div className=" mt-0 w-100">
                <div className="row">
                    {/*  first column */}
                    <div className="col-12 col-sm-4">
                        <p>Contact me</p>
                        <p><i className="bi bi-geo-alt"> Cairo, Egypt</i></p>
                        <p><i className="bi bi-phone"> +20 105 584 098</i></p>
                        <p><i className="bi bi-envelope"> <a className="text-light"
                            href="mailto:catchtheai@gmail.com">catchtheai@gmail.com</a></i></p>
                    </div>


                    {/*  second column  */}
                    <div className="col-12 col-sm-8 ">
                        <form>
                            {/* <!-- nested row  --> */}
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                                        <input type="text" className="form-control" placeholder="Name" aria-label="Username"
                                            aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mt-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                        <input type="email" className="form-control" placeholder="Email" aria-label="Username"
                                            aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                            </div>

                            <div className=" mb-3">
                                <label htmlFor="" className="form-label"></label>
                                <textarea className="form-control" name="" id="" rows="5" placeholder="Your message"></textarea>
                            </div>
                            <div className=" text-center">
                                <button type="submit" className="btn text-center  " style={{backgroundColor:"#DDA0DD", width: "150px" }}><i
                                    className="bi bi-send"> Send</i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;