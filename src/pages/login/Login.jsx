import React, { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState("");

    async function login() {
        console.warn(email, password);
        let raw = {
            email: email,
            password: password,
        };
        let result = await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(raw),
            }
        );
        result = await result.json();
        console.log(result)
        if (result.code === 200) {
            localStorage.setItem("token", JSON.stringify(result.data.token));
            const token = JSON.parse(localStorage.getItem("token"));
            let requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                redirect: "follow",
            };
            let _result = await fetch(
                "https://orphanmanagement.herokuapp.com/api/v1/auth/account",
                requestOptions
            );
            _result = await _result.json();
            localStorage.setItem("current-user", JSON.stringify(_result.data));
            navigate(
                `${
                    _result.data.roles.includes("ROLE_ADMIN")
                        ? "/admin"
                        : _result.data.roles.includes("ROLE_MANAGER")
                        ? "/manager/children"
                        : ""
                }`
            );
        } else {
            if (result.message === "Unauthorized") {
                setErrorMessage("B???n ???? nh???p sai m???t kh???u!");
            } else {
                setErrorMessage("T??i kho???n gmail b???n nh???p ch??a c?? t??i kho???n!");
            }
        }
    }

    return (
        <div className="login">
            <MetaTags>
                <title>CYF Center | ????ng nh???p</title>
            </MetaTags>
            <form className="form form__login">
                <div className="form__top">
                    <Link to="/" style={{ color: "#fff" }}>
                        <span className="logo">
                            <span className="logo__name">CYF</span>
                            Center
                        </span>
                    </Link>
                </div>
                <div className="form__body">
                    <p className="form__desc">
                        Ch??o m???ng b???n ?????n v???i Trung t??m B???o tr??? tr??? em CYF
                    </p>
                    <div className="form__group">
                        <i className="bi bi-envelope icon icon__email"></i>
                        <input
                            type="email"
                            name=""
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <i className="bi bi-lock icon icon__password"></i>
                        <input
                            type="password"
                            name=""
                            placeholder="M???t kh???u"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="login__field"></div>
                    <p style={{ color: "red" }}>
                        {errorMessage && (
                            <div className="error"> {errorMessage} </div>
                        )}
                    </p>
                </div>
                <div className="form__bottom">
                    <button
                        onClick={login}
                        className="btn btn__signin btn--primary"
                        type="button"
                    >
                        ????ng nh???p
                    </button>
                    <div className="no-account">
                        <Link className="btn-sign" to="/Register">
                            Qu??n m???t kh???u?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
