import React from 'react';

import Header from './commons/Header';
import Footer from './commons/Footer';
import { useAuth } from './context/AuthContext';
import { ChildrenProps } from './types/interfaces';
import '../styles/layout.scss';

const Layout = ({ children }: ChildrenProps) => {
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
