import React from 'react';
import { blueGrey } from "@material-ui/core/colors";

export const Layout = ({ children, header }) => {
  return (
    <section
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          minHeight: 50,
          maxHeight: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        {header}
      </header>
      <section style={{ display: "flex", flex: "auto", maxHeight: "calc(100vh - 50px)" }}>
        {/* <aside
          style={{
            maxWidth: 200,
            minWidth: 150,
            background: blueGrey[50],
            height: "100%",
            overflow: "auto",
          }}
        >
          {sideBar}
        </aside> */}
        <main style={{ flex: 1, height: "100%", overflow: "auto" }}>
          {children}
        </main>
      </section>
    </section>
  );
};
