import React, { Component } from "react";
import './pricing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isYearly: false,
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
    // Implement functionality to handle the selection of the plan
    console.log(`Selected plan: ${plan}`);
  }

  render() {
    const { isYearly } = this.state;
    const basicPrice = isYearly ? "$0 / Year" : "$0 / Month";
    const proPrice = isYearly ? "$150 / Year" : "$15 / Month";
    const premiumPrice = isYearly ? "$500 /Year" : "$50 / Month";

    return (
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1 className="title">Plans & Pricing</h1>
          <p className="quote">Whether you are an individual, developer, or enterprise, we have a plan for you.</p>
            
          <button
            type="button"
            className={`btn btn-${isYearly ? 'outline-' : ''}dark`}
            onClick={this.togglePricing}
          >
            {isYearly ? 'Monthly' : 'Yearly'}
          </button>
        </div>
        <div className="row text-center">
          {/* Basic Plan */}
          <div className="col-md-4" data-aos="fade-up">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Basic</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">{basicPrice} <small className="text-muted"></small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li><i className="fa fa-check-circle"></i> Default features with limited access</li>
                  <li><i className="fa fa-check-circle"></i> History of last 5 days</li>
                  <li><i className="fa fa-check-circle"></i> 5 attempts per day</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-outline-dark"
                  onClick={() => this.handlePlanSelection('Basic')}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="col-md-4" data-aos="fade-up">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Professional</h4>
              </div>
              <div className="card-body">
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
                  onClick={() => this.handlePlanSelection('Professional')}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>

          {/* Company Plan */}
          <div className="col-md-4" data-aos="fade-up">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Company</h4>
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
                  onClick={() => this.handlePlanSelection('Company')}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricing;
