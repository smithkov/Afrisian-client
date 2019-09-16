module.exports = {
  production: {
    url: ""
  },
  development: {
    //url: "http://localhost:3000/api",
    url: "https://webapi.softnergy.com/api",
    //imageUrl: "http://localhost:3000/uploads/"
    imageUrl: "https://webapi.softnergy.com/uploads/"
  },
  getImage: image => {
    //let img = "http://localhost:3000/uploads/";
    let img = "https://webapi.softnergy.com/uploads/";
    return `${img}${image}`;
  },
  getImageItem: image => {
    //let img = "http://localhost:3000/Images/";
    let img = "https://webapi.softnergy.com/Images/";
    return `${img}${image}`;
  }
};
