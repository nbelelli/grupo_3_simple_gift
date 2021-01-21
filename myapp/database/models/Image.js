module.exports = (sequelize, DataTypes) => {
	const alias = 'Image';
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		file_name: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
	};
	const config = {
		tableName: 'images',
		timestamps: false,
	};

	const Image = sequelize.define(alias, cols, config);

	Image.associate = (models) => {
		Image.belongsTo(models.Product, {
			as: 'Product',
			foreignKey: 'product_id',
		});
	};

	return Image;
};
