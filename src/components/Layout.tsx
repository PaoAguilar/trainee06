import React, { ReactNode } from 'react';

import Header from './commons/Header'
import Footer from './commons/Footer';
import { useAuth } from './context/AuthContext';
import '../styles/layout.scss';

interface ILayoutProps {
    children: ReactNode;
    // any other props that come into the component
}
const Layout = ({children}: ILayoutProps) => {
  const { jwt } = useAuth();
  return (
    <div className="content">
      {jwt && <Header />}
      <div className="content__wrap-info">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
