import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ListingList from "./ListingList";
import ListingDetail from "./ListingDetail";
import userContext from "./userContext";
import { Navigate } from "react-router-dom";
import ListingForm from "./ListingForm";

/** RoutesList for Sharebnb.
 *
 * Props:
 * - login: function to login user (from parent)
 * - signup: function to register user (from parent)
 *
 * App -> RoutesList
 *     -> { Homepage, LoginForm, SignupForm, ListingList, ListDetail }
 */

function RoutesList({ login, signup, upload }) {

  const { currentUser } = useContext(userContext);
  return (
    <div className="RoutesList">
      <Routes>
        <Route path="/" element={<Homepage login={login} signup={signup} />} />
        <Route path="/listings" element={<ListingList />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="*" element={<Navigate />} />

        {currentUser
          ? <>
            <Route path="/upload" element={<ListingForm upload={upload} />} />
          </>
          : <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </>
        }
      </Routes>
    </div>
  );
}

export default RoutesList;