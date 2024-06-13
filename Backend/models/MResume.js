const DataTypes = require('sequelize');

module.exports = function( sequelize ) {
    return sequelize.define('resume', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          workerId: {
            type: DataTypes.INTEGER,
          },
          workerName: {
            type: DataTypes.STRING,
          },
          skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
          },
          text: {
            type: DataTypes.TEXT,
          },
        }).sync({force: true});
        
}
 