import React, { Component } from "react";
import './pricing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isYearly: false,
      selectedPlan: '', // state to store the selected plan
      showAlert: [false, false, false]
    };
  }

  componentDidMount() {
    AOS.init();
  }

  togglePricing = () => {
    this.setState(prevState => ({
      isYearly: !prevState.isYearly
    }));
  }

  handlePlanSelection = (plan) => {
    // Update the state with the selected plan and show the alert
    this.setState({
      selectedPlan: plan,
    });
    // Show the alert based on the selected plan
    if (plan === 'Basic') {
      this.setState({ showAlert: [true, false, false] });
    }
    if (plan === 'Professional') {
      this.setState({ showAlert: [false, true, false] });
    }
    if (plan === 'Enterprise') {
      this.setState({ showAlert: [false, false, true] });
    }

    // Hide the alert after a few seconds
    // setTimeout(() => {
    //   this.setState({ showAlert: false });
    // }, 3000);


  }

  render() {
    const { isYearly, selectedPlan, showAlert } = this.state;
    const basicPrice = isYearly ? "$0 / Year" : "$0 / Month";
    const proPrice = isYearly ? "$150 / Year" : "$15 / Month";
    const premiumPrice = isYearly ? "$500 / Year" : "$50 / Month";

    return (
      <div className="pricing-container my-5">



        <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Payment & Plans</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Thanks for your interest!</strong> but payment and plans are not available yet due to the fact that this first version of the website is still in development.
                  <br />
                  you can still use the app for free. and support via paypal to continue the development of the app.

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary"><a href="https://www.paypal.me/romanyn36" className=" alert-link text-light">paypal.me/romanyn36</a></button>
              </div>
            </div>
          </div>
        </div>



        <div className="text-center mb-4">
          <h1 className="title text-dark">Plans & Pricing</h1>
          <p className="quote">Whether you are an individual, developer, or enterprise, we have a plan for you.</p>

          <div className="toggle-buttons">
            <button
              type="button"
              className={`btn-toggle ${isYearly ? 'btn-toggle-yearly' : 'btn-toggle-monthly'}`}
              onClick={this.togglePricing}
            >
              {isYearly ? 'Yearly' : 'Monthly'}
            </button>
            <span className="toggle-space"></span>
            <button
              type="button"
              className={`btn-toggle ${isYearly ? 'btn-toggle-monthly' : 'btn-toggle-yearly'}`}
              onClick={this.togglePricing}
            >
              {isYearly ? 'Monthly' : 'Yearly'}
            </button>
          </div>
        </div>


        <div className="row text-center">
          {/* Basic Plan */}
          <div className="col-md-4 d-flex align-items-stretch" data-aos="fade-up">
            <div className="basic flex-fill">
              <div className="card basic_card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Basic</h4>
                </div>
                <div className="card-body" style={{ height: "430px" }}>
                  <h1 className="card-title pricing-card-title">{basicPrice} <small className="text-muted"></small></h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li><i className="fa fa-check-circle"></i> Default features with limited access</li>
                    <li><i className="fa fa-check-circle"></i> History of last 5 days</li>
                    <li><i className="fa fa-check-circle"></i> 5 attempts per day</li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-outline-dark"
                    // onClick={() => this.handlePlanSelection('Basic')}
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >
                    Choose Plan
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Professional Plan */}
          <div className="col-md-4 d-flex align-items-stretch" data-aos="fade-up">
            <div className="professional flex-fill">
              <div className="card basic_card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Professional</h4>
                  <span className="most-popular">MOST POPULAR</span>
                </div>
                <div className="card-body" style={{ height: "430px" }}>
                  <h1 className="card-title pricing-card-title">{proPrice} <small className="text-muted"></small></h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li><i className="fa fa-check-circle"></i> Advanced features with more access</li>
                    <li><i className="fa fa-check-circle"></i> 20 attempts per day</li>
                    <li><i className="fa fa-check-circle"></i> History of last 30 days</li>
                    <li><i className="fa fa-check-circle"></i> File upload size up to 50Mb</li>
                    <li><i className="fa fa-check-circle"></i> Faster response</li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-outline-dark"
                    // onClick={() => this.handlePlanSelection('Professional')}
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >
                    Choose Plan
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="col-md-4 d-flex align-items-stretch" data-aos="fade-up">
            <div className="company flex-fill">
              <div className="card basic_card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Enterprise</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">{premiumPrice} <small className="text-muted"></small></h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li><i className="fa fa-check-circle"></i> The best value for your business</li>
                    <li><i className="fa fa-check-circle"></i> 100 attempts per day</li>
                    <li><i className="fa fa-check-circle"></i> Unlimited history</li>
                    <li><i className="fa fa-check-circle"></i> Unlimited upload size</li>
                    <li><i className="fa fa-check-circle"></i> Faster response</li>
                    <li><i className="fa fa-check-circle"></i> Human support</li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-outline-dark"
                    // onClick={() => this.handlePlanSelection('Enterprise')}
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >
                    Choose Plan
                  </button>

                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Pricing;
