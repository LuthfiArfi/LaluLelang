'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    ProductId: DataTypes.INTEGER,
    Buyer: DataTypes.INTEGER,
    Seller: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, { as : "Buyer"})
  };
  return Transaction;
};