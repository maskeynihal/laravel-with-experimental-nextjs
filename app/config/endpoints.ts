const endpoints = {
  auth: {
    me: "/api/user",
    login: "/login",
  },
  sanctum: {
    csrf: "/sanctum/csrf-cookie",
  },
};

export default endpoints;
