'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    eventId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Events' }
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    const join = {
      through: 'OrderDetail',
      foreignKey: 'orderId',
      otherKey: 'ticketId'
    }
    Order.belongsToMany(models.Ticket, join);
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.belongsTo(models.Event, { foreignKey: 'eventId' });
  };
  return Order;
};
