document.querySelector("#btnRegister").onclick = function () {
  console.log(123);
  //Lấy thông tin User đúng format backend qui định
  var user = new InfoUser();
  user.email = document.querySelector("#email").value;
  user.password = document.querySelector("#password").value;
  user.name = document.querySelector("#name").value;
  user.gender = document.querySelector("#gender").value;
  user.phone = document.querySelector("#phone").value;

  console.log("user", user);

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
    console.log("error", err.response.data);
  });
};
