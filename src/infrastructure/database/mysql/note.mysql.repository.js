import { DataTypes } from "sequelize";
import sequelize from "./connection.js";
import NoteModel from "./note.model.mysql.js";


export default class NoteMySQLRepository {
    async save(noteEntity) {
          const note = await NoteModel.create({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId
        });
        return note.toJSON();
    }
    async findByUserId(userId) {
        return await NoteModel.findAll({ where: { userId } });
    }

    async update(noteId, data) {
        const updatedNote = await NoteModel.findByPk(noteId);
        if (!updatedNote) return null;
        
        await updatedNote.update(data);
        return updatedNote.toJSON();
    }

    async delete(noteId) {
        const note = await NoteModel.findByPk(noteId);
        if (!note) return null;
        
        await note.destroy();
        return note.toJSON();
    }

}