import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: false },
  isPrivate: { type: Boolean, default: false },
  password: { type: String, required: false },
  userId: { type: String, required: false },
  categoryId: { type: String, required: false }
}, { timestamps: true });

const NoteModel = model('Note', noteSchema);


export default NoteModel;