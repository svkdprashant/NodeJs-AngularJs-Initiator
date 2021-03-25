/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const UserDevices = sequelize.define('user_devices', {
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
        device_id: {
			type: DataTypes.STRING(250),
			allowNull: false
        },
        device_token: {
			type: DataTypes.STRING(250),
			allowNull: true
        },
        os_type: {
			type: DataTypes.STRING(50),
			allowNull: true
        },
        model: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		app_version: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		os_version: {
			type: DataTypes.STRING(250),
			allowNull: true
        },
        latitude: {
			type: DataTypes.DECIMAL(10,8),
			allowNull: true
        },
        longitude: {
			type: DataTypes.DECIMAL(11,8),
			allowNull: true
        }
	}, {
		tableName: 'user_devices',
		timestamps: true,
		underscored: true
    });
    
    UserDevices.associate = (models) => {
        UserDevices.belongsTo(models.users, {foreignKey: 'users_id'});
	};

	return UserDevices
};
