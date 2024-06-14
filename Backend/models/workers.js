const DataTypes = require('sequelize');

module.exports = function( sequelize ) {
    return sequelize.define('workers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
          },
          password: {
            type: DataTypes.STRING,
          },
        }, {
        timestamps: false
      }).sync({force: true});   
}
 