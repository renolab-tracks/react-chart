import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div>Header</div>
      <main>{children}</main>
      <footer>Foooter</footer>
    </>
  );
};

export default Layout;
