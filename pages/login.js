import { useState } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import axios from "axios";
import { redirectAuthUser } from "../utils/functions";
import Loader from "../components/Loader/Loader";

import Router from "next/router";

const login = () => {
  const [inputField, setInputField] = useState({
    password: "",
    email: "",
  });
  const [isLogging, setIsLogging] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErMsg] = useState("");
  const [user, setUser] = useState("");

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLogging(true);
      setIsError(false);

      let registeredUsers = localStorage.getItem("registeredUsers");

      registeredUsers = registeredUsers
        ? registeredUsers && JSON.parse(registeredUsers)
        : [];

      const { data } = await axios.post(`/api/login`, {
        email: inputField.email,
        password: inputField.password,
        registeredUsers: registeredUsers || [],
      });

      console.log(data, " LOGIN DATA");

      setIsLogged(true);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsLogging(false);

      setTimeout(() => {
        Router.push("/");
      }, 3000);
    } catch (err) {
      setIsLogged(false);

      // console.log(err);

      let errMsg = err.response?.data?.msg || "something went wrong, try again";

      console.log(errMsg);

      setIsLogging(false);
      setIsError(true);
      setErMsg(errMsg);
    }
  };

  return (
    <Layout>
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            <div className="login__logword">Login to your account</div>
            <Loader />
            <div className="login__text">sign in with your credentials</div>
            <Loader />
            {isLogged ? <div className="footer__do"> logged in...</div> : ""}

            {isLogged ? (
              <div className="footer__do">{user.fullName} welcome...</div>
            ) : (
              ""
            )}
          </div>

          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            inputField={inputField}
            errMsg={errMsg}
            isLogging={isLogging}
            isError={isError}
          />
        </div>
        <div className="oneRow">
          <p>
            <a href="/account/forgotPassword" className="oneRow__one">
              forgot password ?
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = req.cookies.token;

  if (token) {
    redirectAuthUser(token, ctx, "/dashboard");
  }

  return {
    props: {},
  };
}

export default login;
