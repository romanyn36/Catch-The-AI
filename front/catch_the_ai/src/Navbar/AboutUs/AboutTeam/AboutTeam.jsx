import React, { useState, useEffect } from 'react';
import './AboutTeam.css';
import { BASE_DOMAIN_URL } from '../../../index.js';

function AboutTeam() {
  const [team_members, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    console.log("team_members", team_members);
    if (team_members.length > 0) {
      setLoading(false);
    }
  }, [team_members]);

  function fetchTeamMembers() {
    fetch(BASE_DOMAIN_URL + '/users/get_team_members', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data.team_members) {
          setTeamMembers(data.team_members);
        } else {
          console.error('team_members not found in response:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }

  return (
    <div className='container p-0 m-0'>
      <h2 className="text-light">Our Team</h2>
      <div className="team" style={{ opacity: 1 }}>
        {loading && (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {/* Render TeamMember components when team_members are available */}
        {!loading && team_members.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            title={member.title}
            subtitle={member.subtitle}
            userImage={member.image}
            paragraph={member.about}
            social={member.social_links ? member.social_links.split('\n') : []}
          />
        ))}
      </div>
    </div>
  );
}

const TeamMember = ({ name, title, subtitle, userImage, paragraph, social }) => (
  <div className="team-member">
    <div className="card">
      <div className="card-front">
        <div className="team-member__image">
          <figure className="img-holder"><img src={BASE_DOMAIN_URL + userImage} alt={name} /></figure>
        </div>
        <div className="team-member__body">
          <h3 className="team-member__title">{name}</h3>
          <span className="team-member__subtitle">{title}</span>
        </div>
      </div>
      <div className="card-back">
        <div className="team-member__image">
          <figure className="img-holder"><p>{paragraph}</p></figure>
        </div>
        <div>
          <h3 className="team-member__title">{name}</h3>
          <span className="team-member__subtitle">{subtitle}</span>
        </div>
      </div>
      <div className="team-member__social">
        {social && social.map((link, index) => (
          <a key={index} href={link} className="ms-1 team-member__social-link">
            <i className={`fab fa-${index === 0 ? 'github' : 'linkedin'} fs-5`}></i>
          </a>
        ))}
        
      </div>
    </div>
  </div>
);

export default AboutTeam;
