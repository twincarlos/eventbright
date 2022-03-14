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
        email: 'saint@jude.io',
        username: 'saintjude',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://www.kindpng.com/picc/m/366-3662286_st-jude-childrens-research-hospital-logo-png-transparent.png'
      },
      {
        email: 'beuty@zar.io',
        username: 'beautyzar',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://d279m997dpfwgl.cloudfront.net/wp/2015/10/1014_project_runway_cog.jpg'
      },
      {
        email: 'iron@man.io',
        username: 'marvel',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg'
      },
      {
        email: 'fork@knife.io',
        username: 'forkknife',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://www.finedininglovers.com/sites/g/files/xknfdk626/files/2021-07/chef%20%281%29.jpg'
      },
      {
        email: 'us@youth.io',
        username: 'youthpolitics',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/75/2016/12/Government-Politics.png'
      },
      {
        email: 'you@fit.io',
        username: 'youfitness',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/man-deadlift-1296x728-header.jpg?w=1155&h=1528'
      },
      {
        email: 'carlos@carlos.io',
        username: 'twincarlos',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://www.travelbughealth.com/sites/default/files/field/image/adobestock_69893480_0.jpeg'
      },
      {
        email: 'jtpk@jtpk.io',
        username: 'jtpkendall',
        hashedPassword: bcrypt.hashSync('password'),
        profileImage: 'https://content.gallup.com/origin/gallupinc/GallupSpaces/Production/Cms/POLL/q2ul9gqwwkacpwufavxjsa.jpg'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['musicproduction'] }
    }, {});
  }
};
