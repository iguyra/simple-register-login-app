import axios from "axios";

export const getMyBacc = async () => {
  const { data } = await axios.get(`/api/users/getMyBacc`);

  return data;
};

export const getUser = async () => {
  const { data } = await axios.get(`/api/users/getMe`);

  return data;
};

export function redirectAuthUser(token, ctx, to) {
  if (token) {
    if (ctx.req) {
      ctx.res.writeHead(301, { location: `${to}` });
      ctx.res.end();

      return {
        props: {}, // will be passed to the page component as props
      };
    }
  }
}
export function redirectNoAuthUser(token, ctx, to) {
  if (!token) {
    if (ctx.req) {
      ctx.res.writeHead(301, { location: `${to}` });
      ctx.res.end();

      return {
        props: {}, // will be passed to the page component as props
      };
    }
  }
}

import Router from "next/router";

export function logOut() {
  localStorage.setItem("user", "");
  Router.reload();
}

export function handleOpen() {
  setIsOpen(!isOpen);
}
