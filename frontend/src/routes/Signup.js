import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import Layout from '../components/Layout/OnePage';
import './Signup.scss'

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Signup = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setSuccessful(true);
                    window.alert('Votre compte a bien été crée');
                    document.location.href="http://localhost:3001/login";
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <Layout>
            <Form className="log" onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                        <div className="username">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="inputLogin"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required, vusername]}
                            />
                        </div>

                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                className="inputemail"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required, validEmail]}
                            />
                        </div>

                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="inputPassword"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>

                        <div className="submit">
                            <button className="inputSubmit">Sign Up</button>
                        </div>
                    </div>
                )}

                {message && (
                    <div className="form-group">
                        <div
                            className={successful ? "alert alert-success" : "alert alert-danger"}
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </Layout>
    );
};

export default Signup;