const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql', 'user', 'root', {
        host: 'localhost',
        dialect:'postgres'
      });

const MWorkers = require('./models/MWorkers')(sequelize);

module.exports = {
  sequelize: sequelize,
  workers: MWorkers
}
