import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('MySQL connected');
  } catch (error) {
    console.error('MySQL connection error:', error);
    process.exit(1);
  }
};

export default sequelize;