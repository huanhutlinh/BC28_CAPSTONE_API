function getProductById(myParam) {
  // Kết nối API (đường dẫn backend cung cấp)
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + myParam,
    method: "GET",
  });

  //Xử lý thành công
  promise.then(function (result) {
    console.log("result", result.data.content);
    //gọi hàm render Product detail
    renderProductDetail(result.data.content);
  });

  //Xử lý thất bại
  promise.catch(function (err) {
    console.log("result", err.response.data);
  });
}

function renderProductDetail(arrProductDetail) {
  document.querySelector(".image").src = arrProductDetail.image;
  document.querySelector(".name").innerHTML = arrProductDetail.name;
  document.querySelector(".description").innerHTML =
    arrProductDetail.description;
  let size = "";
  for (var numSize = 0; numSize < arrProductDetail.size.length; numSize++) {
    size += `<span>
    ${arrProductDetail.size[numSize]}
    </span>`;
  }
  document.querySelector(".size").innerHTML = size;
  document.querySelector(".price").innerHTML = arrProductDetail.price + "$";
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  console.log("params", myParam);

  //call api load lên giao diện

  getProductById(myParam ? myParam : 1);
  getProductAPI(loadInitialItems);
};
