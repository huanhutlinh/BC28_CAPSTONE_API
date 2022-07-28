function getProductById(callback, myParam) {
  // Kết nối API (đường dẫn backend cung cấp)
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + myParam,
    method: "GET",
  });

  //Xử lý thành công
  // promise.then(function (result) {
  //   console.log("result", result.data.content);
  //   //gọi hàm render Product detail
  //   renderProductDetail(result.data.content);
  // });
  promise.then(function (result) {
    let product = result.data.content;
    let relateProduct = result.data.content.relatedProducts;
    callback(product, relateProduct);

  })

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

function renderRelateProduct(obj, arrRelateProduct) {
  let container = document.querySelector('.feature .products-list ');

  let html = '';
  let out = '';

  for (const item of arrRelateProduct) {
      html += `
          <div class="col-xl-4 col-md-6 col-item">
                      <div class="product-card">
                          <div class="card-img">
                              <img src="${item.image}" alt="">
                          </div>
                          <div class="card-body">
                              <h3>${item.name}</h3>
                              <p>${item.shortDescription}</p>
                              <div class="d-flex price-wrap align-items-center">
                                  <a href="../views/detail.html?id=${item.id}" class="btn-primary-cus">
                                      <span>Buy Now</span>
                                  </a>
                                  <span class="price">$${item.price}</span>
                              </div>
                          </div>
                      </div>
                  </div>
          `
  }
  out = '<div class="row">' + html + '</div>';
  container.innerHTML = out;
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  console.log("params", myParam);

  //call api load lên giao diện

  getProductById(renderProductDetail, myParam ? myParam : 1);
  getProductById(renderRelateProduct,myParam ? myParam : 1);
};
