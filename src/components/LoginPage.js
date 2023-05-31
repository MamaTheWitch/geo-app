import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


const validatePassword = (password) => {
    const rightpincode = 3003;
    return rightpincode == password;
  };
  

export const LoginPage = ({ onSubmitPassword }) => {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      setErrorMessage("");
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (!validatePassword(password)) {
        setErrorMessage("Invalid password");
        return;
      }
  
      onSubmitPassword();
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Password: 
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit">Submit</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    );
  };