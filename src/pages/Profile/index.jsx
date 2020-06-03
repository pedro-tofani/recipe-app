import React, { useState, useEffect } from 'react';
import Header from '../../components-global/Header';
import ButtonsProfile from './components/ButtonsProfile';
import './style/style.css';
import Footer from '../../components-global/Footer';

const Profile = () => {
  const [emailP, setEmailP] = useState('');

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'));
    if (!email) return (<div>Loading...</div>);
    return setEmailP(email);
  }, []);

  if (!emailP.email) return (<div>Loading...</div>);

  return (
    <React.Fragment>
      <Header title={'Perfil'} />
      <div className="container-Profile">
        <h1 data-testid="profile-email">{emailP.email}</h1>
        <div className="container-buttonsP">
          <ButtonsProfile />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
