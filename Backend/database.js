const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'root', {
        host: 'localhost',
        dialect:'postgres'
      });

const MWorkers = require('./models/MWorkers')(sequelize);
const MResume = require('./models/MResume')(sequelize);

module.exports = {
  sequelize: sequelize,
  workers: MWorkers,
  resume: MResume
}
