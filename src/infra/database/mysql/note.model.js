import { DataTypes } from 'sequelize';
import sequelize from './connection.js';

const NoteModel = sequelize.define(
  'Note',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    isPrivate: { type: DataTypes.BOOLEAN, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

export default NoteModel;
