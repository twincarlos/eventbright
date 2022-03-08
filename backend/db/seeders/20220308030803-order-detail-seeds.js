'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('OrderDetails', [
      {
        orderId: 1,
        ticketId: 1,
        amount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 1,
        ticketId: 2,
        amount: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 1,
        ticketId: 3,
        amount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        ticketId: 4,
        amount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        ticketId: 5,
        amount: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        ticketId: 6,
        amount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('OrderDetails', null, {});
  }
};
