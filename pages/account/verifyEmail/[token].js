import { useState } from "react";
import Form from "../../../components/Form";
import Layout from "../../../components/Layout";
import axios from "axios";
import URLbaseAPI from "../../../utils/URLbaseAPI";
import Router from "next/router";

const verifyEmail = ({ success }) => {
  console.log(success);

  return (
    <Layout>
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            {success ? (
              <div className="login__logword">
                email verified successfully
                <div className="form__button">
                  <button className="form__button--link">
                    <a href="/login">go to login</a>
                  </button>
                </div>
              </div>
            ) : (
              <div className="login__logword">
                This invitation link isn't valid
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  console.log("from async");
  const { req, res } = context;

  let token = context.params.token;

  console.log("req params token", token);
  try {
    const { data } = await axios.post(
      `${URLbaseAPI}/api/users/verifyEmail/${token}`
    );

    console.log(data);

    return {
      props: { success: data.success },
    };
  } catch (err) {
    console.log(err);
    console.log(err.response);
    return {
      props: { success: false },
    };
  }
}

export default verifyEmail;
