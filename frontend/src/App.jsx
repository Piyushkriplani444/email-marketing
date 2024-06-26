// import React, { useState } from "react";
// import axios from "axios";
import AuthForm from "./components/authForm";
import { Route, Routes } from "react-router-dom";
// import After from "./components/After";
// import EmailList from "./components/EmailList";
// import EmailDetail from "./components/Email";

const App = () => {
  // const [authUrl, setAuthUrl] = useState("");

  // const getAuthUrl = async () => {
  //   const response = await axios.get("http://localhost:3000/auth/url");
  //   setAuthUrl(response.data.url);
  // };

  return (
    <>
      <h1 className="border-l-0"> Welcome to My app</h1>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        {/* <Route path="/emails" element={<EmailList />} />
      <Route path="/auth/google/callback" element={<After />} />
      <Route path="/emails/:emailId" element={<EmailDetail />} /> */}
      </Routes>
    </>
  );
};

export default App;
