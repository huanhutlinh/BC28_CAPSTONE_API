
function getProductAPI(callback){
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET'
    })

    promise.then(function(result){
        let arrProduct = result.data.content;
        callback(arrProduct);



    })

    promise.catch(function(error){
        console.log(error.response.data);
    })
}

function loadInitialItems(arrProd){
    let initialItems = 6;
    let loadItems = 6;
    let html = '';
    let out ='';
    let counter = 0;

    let container = document.querySelector('.feature .products-list ');
    
    

    for (const item of arrProd) {
        if(counter < initialItems){
            html+= `
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
    out = '<div class="row">'+html+'</div>';
    container.innerHTML = out;
}

function loadMoreItem(arrProduct){
    let loadMoreBtn = document.querySelector('#add-more-btn');
    let loadItems = 6;
    let currentItems = document.querySelectorAll('.feature .product-card').length;
    let container = document.querySelector('.feature .products-list');
    let html = '';
    let out = '';

    if(currentItems < arrProduct.length){
        for(let i= currentItems; i<currentItems+loadItems;i++){
            if(i>arrProduct.length-1){
                loadMoreBtn.style.display = 'none'
                break;
            }
            let item = arrProduct[i];
            html+= `
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
        out = '<div class="row">'+html+'</div>';
        let doc = new DOMParser().parseFromString(out,"text/html");
        container.appendChild(doc.documentElement);
    }




}

function loadCarousel(arrProduct){
    
}
window.onload = function(){
    getProductAPI(loadInitialItems);
    
}