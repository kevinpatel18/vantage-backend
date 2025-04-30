module.exports = {
  api: {
    port: 8000,
    root: "/api",
  },

  auth: {
    jwt: {
      secret: "jwt_secret",
      expiresIn: "24 * 60 * 60",
    },
    mail: {
      email: "kevinwebmyne@gmail.com",
      password: "zzmgzpokkrnlnylz",
    },
  },

  db: {
    host: "in-mum-web1188.main-hosting.eu",
    port: "3306",
    user: "u114316720_vantageadmin",
    password: "M*]/CBp0",
    database: "u114316720_vantage",
  },

  uploads: {
    file_path: "uploads",
  },

  payment: {
    key_id: "rzp_test_sGTW0EL02VcLfQ",
    key_secret: "aVLX05TevyjFxY8ZmOsPwULH",
  },
  cloudinary: {
    cloud_name: "db9u3vdhh",
    api_key: "426115716493114",
    api_secret: "ILLHSMG9HD5WiIa5Ddewwg5hJ7k",
  },
};
