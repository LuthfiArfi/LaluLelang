'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', 
    [{
      name: "rahman",
      early_bid: "25000",
      end_bid: "50000",
      end_time: "2018/12/31 12:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "rahman",
      early_bid: "25000",
      end_bid: "50000",
      end_time: "2018/12/31 12:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null)
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
