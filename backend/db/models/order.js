'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    hostId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    eventId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    eventName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    eventDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    eventImage: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Order;
};
