module.exports = (sequelize, DataTypes) => {
	const alias = 'User';
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		lastname: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.INTEGER,
		},
		password: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.STRING,
		},
	};

	const config = {
		tableName: 'users',
		timestamps: false,
	};

	const User = sequelize.define(alias, cols, config);

	return User;
};
