import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignupForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.errors);
        }
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Sign Up</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name="username"
                                       className="form-control"
                                       value={formData.username}
                                       onChange={handleChange}
                                       placeholder="username.."
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       name="password"
                                       className="form-control"
                                       value={formData.password}
                                       onChange={handleChange}
                                       placeholder="password.."
                                />
                            </div>
                            <div className="form-group">
                                <input name="firstName"
                                       className="form-control"
                                       value={formData.firstName}
                                       onChange={handleChange}
                                       placeholder="first name.."
                                />
                            </div>
                            <div className="form-group">
                                <input name="lastName"
                                       className="form-control"
                                       value={formData.lastName}
                                       onChange={handleChange}
                                       placeholder="last name.."
                                />
                            </div>
                            <div className="form-group">
                                <input type="email"
                                       name="email"
                                       className="form-control"
                                       value={formData.email}
                                       onChange={handleChange}
                                       placeholder="@email.."
                                />
                            </div>
                            <button type="submit" onSubmit={handleSubmit} className="btn btn-primary float-right">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;