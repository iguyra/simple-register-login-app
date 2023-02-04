import { useState } from "react";
import forgotPassowrdForm from "../../components/Forms/forgotPassowrdForm";
import Layout from "../../components/Layout";
import axios from "axios";
import URLbaseAPI from "../../utils/URLbaseAPI";
import { redirectAuthUser } from "../../utils/functions";
import Loader from "../../components/Loader/Loader";
import Router from "next/router";

const forgotPassword = () => {
  const [inputField, setInputField] = useState({
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErMsg] = useState("");

  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitted(false);
      setIsSubmitting(true);
      setIsError(false);
      const { data } = await axios.patch(`/api/users/forgotPassword`, {
        email: inputField.email,
      });

      setIsLogged(true);
      setIsSubmitting(false);

      setIsSubmitted(true);
    } catch (er) {
      setIsLogged(false);
      setIsSubmitting(false);

      setIsSubmitted(false);
      setIsError(true);
      setErMsg(er.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            <div className="login__logword">Reset Your Password</div>
            {isSubmitted ? (
              <div className="success">
                <p className="success__msg">
                  please login to your email and use the link to reset your
                  password
                </p>
              </div>
            ) : (
              <div className="login__text">
                we will send you and email to recover your password
              </div>
            )}

            {isError && (
              <div className="error">
                <div className="errMsg">{errMsg}</div>
              </div>
            )}

            <Loader />
            <Loader />
          </div>

          <form className="form" onSubmit={handleSubmit} action="">
            <div className="form__group">
              <label htmlFor="firstName" className="form__label">
                email
              </label>
              <input
                onChange={handleChange}
                value={inputField.email}
                name="email"
                type="email"
                className="form__input"
              />
            </div>
            <div className="form__button">
              <button className="form__button--link">
                {!isSubmitting ? "reset" : "resetting..."}
              </button>
            </div>
          </form>
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

export default forgotPassword;
