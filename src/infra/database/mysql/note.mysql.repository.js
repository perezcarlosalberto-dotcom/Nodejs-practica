import NoteModel from './note.model.js';

export default class NoteMySQLRepository {
  async save(note) {
    const newNote = await NoteModel.create(note);

    return newNote.toJSON();
  }

  async findByUserId(userId) {
    return await NoteModel.findAll({ where: { userId } });
  }

  async findById(id) {
    return await NoteModel.findByPk(id);
  }

  async update(id, note) {
    return await NoteModel.findByIdAndUpdate(id, note, { new: true });
  }

  async delete(id) {
    return await NoteModel.findByIdAndDelete(id);
  }
}