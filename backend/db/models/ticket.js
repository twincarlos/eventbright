'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    eventId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Events' }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here
    Ticket.belongsTo(models.Event, { foreignKey: 'eventId' });
    Ticket.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Ticket;
};