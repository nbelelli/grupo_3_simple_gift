module.exports = (sequelize, DataTypes) => {
	const alias = 'Category';
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
	};
	const config = {
		tableName: 'categories',
		timestamps: false,
	};

	const Category = sequelize.define(alias, cols, config);

	Category.associate = (models) => {
		Category.hasMany(models.Product, {
			as: 'Product',
			foreignKey: 'category_id',
		});
	};

	return Category;
};
