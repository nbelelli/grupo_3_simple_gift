module.exports = (sequelize, DataTypes) => {
	const alias = 'Product';
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.DOUBLE,
		},
		description: {
			type: DataTypes.STRING,
		},
		discount: {
			type: DataTypes.INTEGER,
		},
		image: {
			type: DataTypes.STRING,
		},
		best_seller: {
			type: DataTypes.INTEGER,
		},
		stock: {
			type: DataTypes.INTEGER,
		},
		category_id: {
			type: DataTypes.INTEGER,
		},
	};

	const config = {
		tableName: 'products',
		timestamps: false,
	};

	const Product = sequelize.define(alias, cols, config);

	Product.associate = (models) => {
		Product.belongsTo(models.Category, {
			as: 'Category',
			foreignKey: 'category_id',
		});

		Product.hasMany(models.Image, {
			as: 'Images',
			foreignKey: 'product_id',
		});
	};

	return Product;
};
