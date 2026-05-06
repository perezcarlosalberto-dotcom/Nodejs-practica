import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async createNote(note) {
    if (!note.title || !note.content) { throw new Error('Title and content are required') };

    const newNote = new NoteEntity(note.id, note.title, note.content, note.image, note.isPrivate, note.password, note.userId, note.categoryId);

    return await this.noteRepository.save(newNote);
  }

  async getNoteByUserId(userId) {
    return await this.noteRepository.findByUserId(userId);
  }

  async getNoteById(id) {
    return await this.noteRepository.findById(id);
  }

  async updateNote(id, note) {
    return await this.noteRepository.update(id, note);
  }
  
  async deleteNote(id) {
    return await this.noteRepository.delete(id);
  }

  async getPublicNoteById(id) {
    const note = await this.noteRepository.findById(id);
    if (!note) { return null; }
    if (note.isPrivate) { throw new Error('This note is private') };
    return note;
  }

}