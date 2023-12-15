import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import SharebnbApi from "./api";
import userContext from "./userContext";

import 'bootswatch/dist/litera/bootstrap.min.css';
import './App.css';

import Nav from "./Nav";
import RoutesList from "./RoutesList";


/** Main App component for Sharebnb.
 *
 * State:
 * - currentUser: { username, firstName, lastName, email, phone }
 * - token: { token }
 * - isLoaded: boolean to check if data has been fetched.
 * - listings: TODO:
 *
 * App -> { Nav, RoutesList }
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoaded, setIsLoaded] = useState(false);

  /** Calls on api to grab user data and set it to current state.
   *
   * If no user, app still renders.
   */
  useEffect(function getCurrentUser() {
    async function fetchCurrentUser(username) {
      const user = await SharebnbApi.getUser(username);
      setCurrentUser(user)
      setIsLoaded(true)
    }
      if(token) {
        try {
          const { username } = jwtDecode(token);
          SharebnbApi.token = token;
          fetchCurrentUser(username)
          // token ? fetchCurrentUser() : setIsLoaded(true);

        } catch (err) {
          console.warn("TOKEN INVALID", err);
          setIsLoaded(true);
        }
      } else {
        setIsLoaded(true);
      }
      // try {
      //   // setCurrentUser(user);
      //   // setIsLoaded(true);
      // } catch (err) {
      //   console.error(err);
      // }

  }, [token]);

  /** Sets token to localStorage if valid token has been sent.
   *
   * Otherwise, remove existing token from localStorage.
   */
  useEffect(function setToken() {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");

  }, [token]);

  /** fetches token from backend with username/password.
   *  also sets token to state.
   */
  async function login(user) {
    const token = await SharebnbApi.login(user);
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoaded(false)
  }

  /** registers user to database from server with form data.
   *  sets token in state.
   */
  async function signup(userData) {
    const token = await SharebnbApi.register(userData);

    setToken(token);
  }

  /** sets current user and token to null. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** handles file submission for listings. */
  async function upload(formData) {
    const listing = await SharebnbApi.addListing(formData);
  }

  //TODO: if there's time, create spinner component and render here.
  if (!isLoaded) return <h1>Sharebnb Loading...</h1>;

  return (
    <div className="App">
      <userContext.Provider value={{ currentUser }}>
        <BrowserRouter>
          <Nav logout={logout} />
          <RoutesList
            login={login}
            signup={signup}
            logout={logout}
            upload={upload}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
