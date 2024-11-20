import React from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
