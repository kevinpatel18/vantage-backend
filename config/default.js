module.exports = {
  api: {
    port: 3006,
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
    host: "vintage-pinnacle-pinnaclevintage47-c3b9.h.aivencloud.com",
    port: "28427",
    user: "avnadmin",
    password: "AVNS_LqXOIkaj2outVk_9p0k",
    database: "defaultdb",
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
