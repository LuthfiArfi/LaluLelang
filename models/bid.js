'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define('Bid', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Bid: DataTypes.INTEGER
  }, {});
  Bid.associate = function(models) {
    // associations can be defined here
  };
  return Bid;
};
