/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const Users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING(191),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		firstname: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		dob: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		user_type: {
			type: DataTypes.ENUM('USER', 'ADMIN'),
			allowNull: false,
			defaultValue: 'USER'
		},
		is_active: {
			type: DataTypes.TINYINT(4),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		tableName: 'users',
        timestamps: true,
        underscored: true,
		charset: 'utf8mb4'
	});

	return Users
};
