module.exports = {
  default: {
    show: false,
    message: "",
    decorator: "alert alert-success"
  },
  success: msg => {
    return {
      show: true,
      message: msg,
      decorator: "alert alert-success"
    };
  },
  danger: msg => {
    return {
      show: true,
      message: msg,
      decorator: "alert alert-danger"
    };
  },
  warning: msg => {
    return {
      show: true,
      message: msg,
      decorator: "alert alert-warning"
    };
  },

  successCreate: value => {
    return `${value} was successfully created! `;
  }
};
