'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    eventId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Events' }
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
    const join = {
      through: 'OrderDetail',
      foreignKey: 'ticketId',
      otherKey: 'orderId'
    }
    Ticket.belongsToMany(models.Order, join);
    Ticket.belongsTo(models.Event, { foreignKey: 'eventId' });

  };
  return Ticket;
};
