'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'music@production.io',
        username: 'musicproduction2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'sports@life.io',
        username: 'sportslife',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'fork@knife.io',
        username: 'forkknife',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['musicproduction'] }
    }, {});
  }
};
