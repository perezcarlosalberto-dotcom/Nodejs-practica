import NoteModel from './note.model.js';

export default class NoteMongoRepository {
  async save(note) {
    const newNote = new NoteModel(note);
    return await newNote.save();
  }

  async findByUserId(userId) {
    return await NoteModel.find({ userId });
  }

  async findById(id) {
    return await NoteModel.findById(id);
  }

  async update(id, note) {
    return await NoteModel.findByIdAndUpdate(id, note, { new: true });
  }

  async delete(id) {
    return await NoteModel.findByIdAndDelete(id);
  }
}