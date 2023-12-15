import React, { useContext } from "react";
import userContext from "./userContext";
import { Link } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";
import "./Homepage.css";

/**
 * Homepage: Renders welcome message to logged in users or links to signup/login
 *
 * RoutesList => Homepage
 *
 */

function Homepage() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="Homepage">
      <Card>
        <CardBody>
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fd02d7d5-97d7-481d-a81f-06f546c0c7fb/dc89ogq-ad89e101-0c78-4a37-a573-9cb80311aa03.png/v1/fill/w_1032,h_774,q_70,strp/background__generic_outdoor_scene_1_by_kindheart525_dc89ogq-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUzNiIsInBhdGgiOiJcL2ZcL2ZkMDJkN2Q1LTk3ZDctNDgxZC1hODFmLTA2ZjU0NmMwYzdmYlwvZGM4OW9ncS1hZDg5ZTEwMS0wYzc4LTRhMzctYTU3My05Y2I4MDMxMWFhMDMucG5nIiwid2lkdGgiOiI8PTIwNDgifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.GJaeJbs8m58r7ioVCDIWfkNYdIqkbCVl-j3MGL4T9KM"
            width="200px"
          />
          <h1>ShareBnB</h1>
          <h4>Sharing anywhere outdoors.</h4>
          {currentUser ?
            <h2>Hello, {currentUser.user.username}!</h2> :
            <>
              <Link to="/login"><button className="btn btn-success">Login</button></Link>
              <Link to="/signup"><button className="btn btn-success">Sign Up</button></Link>
            </>}
        </CardBody>
      </Card>
    </div >
  );

}

export default Homepage;