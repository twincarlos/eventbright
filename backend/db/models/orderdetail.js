'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Orders' }
    },
    ticketName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ticketPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL
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
