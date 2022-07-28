import { Validation } from "../models/Validation.js";
function processForm(e) {
  if (e.preventDefault) e.preventDefault();

  /* do what you want with the form */

  // You must return false to prevent the default form behavior
  return false;
}

var form = document.getElementById("register-form");
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}

document.querySelector("#btnRegister").onclick = function () {
  //Lấy thông tin User đúng format backend qui định
  var user = new InfoUser();
  user.email = document.querySelector("#email").value;
  user.password = document.querySelector("#password").value;
  var passwordConfirm = document.querySelector("#rePassword").value;
  user.name = document.querySelector("#name").value;
  user.gender = document.querySelector('input[name="genderS"]:checked').value;
  user.phone = document.querySelector("#phone").value;

  // console.log("user", user);

  // Valudation
  var check = new Validation();
  var valid = true;

  //Kiểm tra Email
  valid &= check.kiemTraEmail(user.email, "#emailVal");

  // Kiểm tra mật khẩu
  valid &= check.kiemTraDoDai(user.password, "#pwdVal", 6, 12);

  // Xác nhận lại mật khẩu
  if (passwordConfirm !== user.password) {
    document.querySelector("#rePwdVal").innerHTML =
      "Mật khẩu nhập lại không đúng";
    valid &= false;
  } else {
    document.querySelector("#rePwdVal").innerHTML = "";
  }

  //Kiểm tra tên
  valid &= check.kiemTraKyTu(user.name, "#nameVal");
  // Kiểm tra số điện thoại
  valid &= check.kiemTraTatCaSo(user.phone, "#phoneVal");

  // Kiểm tra rỗng
  valid &=
    check.kiemTraRong(user.email, "#emailVal") &
    check.kiemTraRong(user.password, "#pwdVal") &
    check.kiemTraRong(passwordConfirm, "#rePwdVal") &
    check.kiemTraRong(user.name, "#nameVal") &
    check.kiemTraRong(user.phone, "#phoneVal");

  //Kiểm tra biến cờ
  if (!!!valid) {
    return;
  } else {
    //   Gọi API
    var promise = axios({
      url: "https://shop.cyberlearn.vn/api/Users/signup",
      method: "POST",
      data: user, // format theo backend yêu cầu
    });

    // Xử lý thành công
    promise.then(function (result) {
      console.log("result", result.data.content);
      alert("Đăng Ký tài khoản thành công!");
    });
    //Xử lý thất bại
    promise.catch(function (err) {
      // console.log("error", err.response.data.statusCode);
      if (err.response.data.statusCode === 400) {
        document.getElementById("emailVal").innerHTML =
          err.response.data.message;
      }
    });
  }
};
