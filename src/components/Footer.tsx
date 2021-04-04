import React, { memo } from 'react';
import '../styles/footer.scss';
import { useAuth } from './context/AuthContext';
const Footer = () => {
  const { jwt } = useAuth();
  return (
    <>
      <footer className="footer">
        <h1>Game Zone</h1>
        <div className="footer__right">
          <div className="footer__links">
            <div>
              <h3>About</h3>
              <h5>{jwt}</h5>
            </div>
            <div>
              <h3>Need help?</h3>
            </div>
            <div>
              <h3>Contact</h3>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <p>© Applaudo Studios - React Trainee Program 2021</p>
      </div>
    </>
  );
};

export default memo(Footer);
