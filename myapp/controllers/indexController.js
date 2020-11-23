const { renderFile } = require('ejs');
const fs = require('fs');
const path = require('path');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

function getAllProducts() {
	//Devuelve la DB en un array de objetos literales
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

function writeProducts(productsToSave) {
	//Recibe un Array de objetos literales.
	//Lo convierte en un JSON
	//Reemplaza TODO el json de DB con este neuvo JSON
	const productsToStringify = JSON.stringify(productsToSave, null, ' ');
	return fs.writeFileSync(productsFilePath, productsToStringify);
}

function generateNewId() {
	const products = getAllProducts();
	return products.pop().id + 1;
}

indexController = {
	home: (req, res) => {
		res.locals.title = 'Home';
		const products = getAllProducts();
		const elegidos = products.filter((product) => {
			return product.masVendido == true;
		});
		res.render('index', { elegidos: elegidos });
	},
};

module.exports = indexController;
