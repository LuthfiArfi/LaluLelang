'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    early_bid: DataTypes.INTEGER,
    end_bid: DataTypes.INTEGER,
    end_time: DataTypes.DATE,
    img: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, {
      through : models.Bid
    })
  };
  return Product;
};
