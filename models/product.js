'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    early_bid: DataTypes.INTEGER,
    end_bid: DataTypes.INTEGER,
    end_time: DataTypes.DATE,
    img: DataTypes.STRING,
    isExpired: {
      type : DataTypes.INTEGER,
      defaultValue: 0
    },
    UserId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
    Product.belongsToMany(models.User, { through : models.Bid })

    Product.allNotExpired = function() {
      return new Promise( (resolve, reject) => {
        Product.findAll( { where: { isExpired: 0}})
        .then( data => {
          resolve(data)
        })
        .catch( err => {
          reject(err)
        })
      })
    }

  };

  Product.prototype.fixDate = function() {
    let year = (this.end_time).getFullYear()
    let month = (this.end_time).getMonth() + 1
    let date = (this.end_time).getDate()
    let hour = (this.end_time).getHours()
    if (hour < 10) {
      hour = '0' + hour
    }
    let minute = (this.end_time).getMinutes()

    if (minute < 10) {
      minute = '0' + minute
    }

    let seconds = (this.end_time).getSeconds()
    if (seconds < 10) {
      seconds = '0' + seconds
    }

    let obj = {
      id : this.id,
      name : this.name,
      early_bid : this.early_bid,
      end_bid : this.end_bid,
      img : this.img,
      end_time : `${year}/${month}/${date} ${hour}:${minute}:${seconds}`

    }
    return obj
  }
  return Product;
};
