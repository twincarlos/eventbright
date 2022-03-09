'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Tickets', [
      {
        name: 'Regular',
        eventId: 1,
        price: 10.00,
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VIP',
        eventId: 1,
        price: 30.00,
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Premium',
        eventId: 1,
        price: 50.00,
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Regular',
        eventId: 2,
        price: 10.00,
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VIP',
        eventId: 2,
        price: 30.00,
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Premium',
        eventId: 2,
        price: 50.00,
        amount: 10,
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
    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
