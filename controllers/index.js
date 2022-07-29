
function getProductAPI(callback) {
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET'
    })

    promise.then(function (result) {
        let arrProduct = result.data.content;
        callback(arrProduct);



    })

    promise.catch(function (error) {
        console.log(error.data.message);
    })
}

function loadInitialItems(arrProd) {
    let initialItems = 6;
    let html = '';
    let out = '';
    let counter = 0;

    let container = document.querySelector('.feature .products-list ');



    for (const item of arrProd) {
        if (counter < initialItems) {
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
                                    <a href="#" class="btn-primary-cus">
                                        <span>Buy Now</span>
                                    </a>
                                    <span class="price">$${item.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            `
        }
        counter++;
    }
    out = '<div class="row">' + html + '</div>';
    container.innerHTML = out;
}

function loadMoreItem(arrProduct) {
    let loadMoreBtn = document.querySelector('#add-more-btn');
    let loadItems = 6;
    let currentItems = document.querySelectorAll('.feature .product-card').length;
    let container = document.querySelector('.feature .products-list');
    let html = '';
    let out = '';

    if (currentItems < arrProduct.length) {
        for (let i = currentItems; i < currentItems + loadItems; i++) {
            if (i > arrProduct.length - 1) {
                loadMoreBtn.style.display = 'none'
                break;
            }
            let item = arrProduct[i];
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
                                    <a href="#" class="btn-primary-cus">
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
        let doc = new DOMParser().parseFromString(out, "text/html");
        container.appendChild(doc.documentElement);
    }




}

function loadCarousel(arrProduct) {
    let out = '';
    let slides = 3;
    let container = document.querySelector('.carousel .carousel-inner');
    let cloneArr = arrProduct;

    for (let i = 0; i < slides; i++) {
        let randomIndex = Math.floor(Math.random() * (cloneArr.length - 1));
        let item = cloneArr[randomIndex];
        let html ='';
        let wrap = ''

        html += `

        <div class="slide-wrap">
            <div class="slide-content d-flex justify-content-center align-items-center">
                <div class="slide-left">
                    <div class="img-product">
                        <img src="${item.image}" alt="">
                    </div>
                </div>
                <div class="slide-right d-flex align-items-center">
                    <div class="product-detail">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <a href="#" class="btn-primary-cus">
                            <span>Buy Now</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="bottom-slide-cover">
                <img src="../img/image 6.png" alt="">
            </div>
        </div>

        `;
        i===0?wrap = '<div class="carousel-item active">'+html+'</div>':wrap='<div class="carousel-item">'+html+'</div>'
        out+=wrap;
        cloneArr.splice(randomIndex, 1)
    }
    container.innerHTML = out;
}
window.onload = function () {
    getProductAPI(loadInitialItems);
    getProductAPI(loadCarousel);
}
