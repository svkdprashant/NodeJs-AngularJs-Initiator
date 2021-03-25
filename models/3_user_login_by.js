/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const UserLoginBy = sequelize.define('user_login_by', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		users_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
		},
		login_by: {
			type: DataTypes.ENUM('Google', 'Facebook', 'Apple'),
            allowNull: false,
            defaultValue: 'Google'
		},
		social_id: {
			type: DataTypes.STRING(3000),
			allowNull: false
		}
	}, {
		tableName: 'user_login_by',
		timestamps: true,
		underscored: true
    });
    
    UserLoginBy.associate = (models) => {
		UserLoginBy.belongsTo(models.users, {foreignKey: 'users_id'});
	};

	return UserLoginBy
};
