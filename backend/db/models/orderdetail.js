'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Orders' }
    },
    ticketId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Tickets' }
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  OrderDetail.associate = function(models) {
    // associations can be defined here
  };
  return OrderDetail;
};
