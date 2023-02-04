import { useState } from "react";
import ResetPassowrdForm from "../../../components/Forms/ResetPassowrdForm";
import Layout from "../../../components/Layout";
import axios from "axios";
import URLbaseAPI from "../../../utils/URLbaseAPI";
import { redirectAuthUser } from "../../../utils/functions";
import Loader from "../../../components/Loader/Loader";
import Router from "next/router";

const login = () => {
  const [inputField, setInputField] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isLogging, setIsLogging] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErMsg] = useState("");

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLogging(true);
      setIsError(false);
      const { data } = await axios.post(`/api/users/resetPassword`, {
        newPassword: inputField.newPassword,
        confirmNewPassword: inputField.confirmNewPassword,
      });

      setIsLogged(true);
      Router.push("/dashboard");
      setIsLogging(false);
    } catch (er) {
      setIsLogged(false);

      setIsLogging(false);
      setIsError(true);
      setErMsg(er.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            <div className="login__logword">reset your password</div>
            <Loader />
            <Loader />
            {isLogged ? <div className="footer__do">logging in...</div> : ""}
          </div>

          <ResetPassowrdForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            inputField={inputField}
            errMsg={errMsg}
            isLogging={isLogging}
            isError={isError}
          />
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
