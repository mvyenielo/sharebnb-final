import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "./userContext";
import "./Nav.css";

/** Renders Nav component.
 *
 * Props:
 * - logout(): calls parent function to log user out.
 *
 * App -> Nav
 */

function Nav({ logout }) {
  const { currentUser } = useContext(userContext);

  return (
    <nav className="Nav">
      <Link className="Nav-heading" to="/">ShareBnB</Link>
      <NavLink className="Nav-Link" to="/listings">Listings</NavLink>

      {currentUser
        ? <div>
          <NavLink className="Nav-Link" to="/upload">Add a Listing</NavLink>
          <Link className="Nav-Link" to="/" onClick={logout}>Logout</Link>
        </div>
        : <div>
          <NavLink className="Nav-Link" to="/login">Login</NavLink>
          <NavLink className="Nav-Link" to="/signup">Signup</NavLink>
        </div>}
    </nav>
  );
}

export default Nav;