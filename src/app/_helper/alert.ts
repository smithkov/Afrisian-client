export class AlertFactory {
  decorator: string = null;
  show: boolean = false;
  message: string = null;

  danger: string = "alert alert-danger";
  warning: string = "alert alert-warning";
  success: string = "alert alert-success";
  constructor() {}
  getDanger(message) {
    return {
      message: message,
      show: true,
      decorator: this.danger
    };
  }
  getEmpty() {
    return {
      message: "",
      show: false,
      decorator: this.danger
    };
  }
  getSuccess(msg: any) {
    var data = {
      message: msg,
      show: true,
      decorator: this.success
    };
    data.message = msg;
    return data;
  }

  getWarning(message) {
    return {
      message: message,
      show: true,
      decorator: this.warning
    };
  }
}
