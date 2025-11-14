const sequelize = require('../config/db');
const User = require('./user');
const Patient = require('./patient');
const Encounter = require('./encounter');

User.initModel(sequelize);
Patient.initModel(sequelize);
Encounter.initModel(sequelize);

// associations
User.hasMany(Encounter, { foreignKey: 'userId' });
Patient.hasMany(Encounter, { foreignKey: 'patientId' });
Encounter.belongsTo(User, { foreignKey: 'userId' });
Encounter.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = { sequelize, User, Patient, Encounter };
