import React from "react";
import Navigation from "../components/Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <Navigation />

      {children}
    </div>
  );
};

export default Layout;
