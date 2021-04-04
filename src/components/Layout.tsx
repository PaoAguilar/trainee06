import React, { ReactNode } from 'react';
import Header from './Header'
import Footer from './Footer';
import '../styles/layout.scss';

interface ILayoutProps {
    children: ReactNode;
    // any other props that come into the component
}
const Layout = ({children}: ILayoutProps) => {
  return (
    <div className="content">
      <Header />
      <div className="content__wrap-info">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
