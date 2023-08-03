import React, { useContext } from "react";
import { Link } from "react-router-dom"
import "./Homepage.css";
import UserContext from "../auth/UserContext";

function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Mikey's Job Board</h1>
                <p className="lead">I need a job.</p>
                {currentUser ? <h2>Welcome back, {currentUser.firstName || currentUser.username}.</h2>
                : ( <p>
                        <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
                            LogIn
                        </Link>
                        <Link className="btn btn-primary font-weight-bold mr-3" to="/signup">
                            SignUp
                        </Link>
                </p>
                )};
            </div>
        </div>
    );
}

export default Homepage;
