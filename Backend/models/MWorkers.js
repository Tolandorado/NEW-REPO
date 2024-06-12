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
          skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
          },
          phoneNumber: {
            type: DataTypes.STRING,
          },
          email: {
            type: DataTypes.STRING,
            unique: true,
          },
        }).sync({force: true});
        
}
 