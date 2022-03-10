'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'music@production.io',
        username: 'musicproduction',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://online.berklee.edu/takenote/wp-content/uploads/2020/11/what_music_producers_do_article_image_2020.jpg'
      },
      {
        email: 'sports@life.io',
        username: 'sportslife',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://www.auburn-reporter.com/wp-content/uploads/2020/02/20463342_web1_T-sports-for-all-2.jpg'
      },
      {
        email: 'fork@knife.io',
        username: 'forkknife',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://www.finedininglovers.com/sites/g/files/xknfdk626/files/2021-07/chef%20%281%29.jpg'
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
