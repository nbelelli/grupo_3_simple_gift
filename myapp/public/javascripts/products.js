window.onload = function () {
	const queryString = window.location.search;
	console.log('query: ', queryString);
	const params = new URLSearchParams(queryString);
	console.log('los params', params);
	const cat = params.get('cat');
	console.log('la category es:', cat);

	const API_BASE_URL = 'http://localhost:3000/api/';

	const axiosAPI = axios.create({
		baseURL: API_BASE_URL,
	});

	const productsContainer = document.querySelector('#prueba');
	console.log(productsContainer);

	function renderProducts(products) {
		for (product of products) {
			productsContainer.innerHTML += `
            <div class="card" style="width: 18rem; margin-bottom: 20px">
            <img          
                src="/images/Products/${product.Images[0].file_name} " 
                class="card-img-top prodImage"
                alt="..."
            />
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">$${product.price}</p>
                <a href="/products/${product.id}" class="btn btn-primary"
                    >Ver</a
                >
                <a href="#" class="btn btn-primary"
                    >Agregar al carrito</a
                >
            </div>
        </div>
            `;
		}
	}

	function loadProducts() {
		axiosAPI.get('products').then((res) => {
			console.log(res.data.data.products);
			renderProducts(res.data.data.products);
		});
	}

	loadProducts();
};
