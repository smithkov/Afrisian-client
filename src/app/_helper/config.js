module.exports = {
  production: {
    url: ""
  },
  development: {
    url: "http://localhost:3000/api",
    imageUrl: "http://localhost:3000/uploads/"
  },
  getImage: image => {
    let img = "http://localhost:3000/uploads/";
    return `${img}${image}`;
  }
};
