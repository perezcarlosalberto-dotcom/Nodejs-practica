export default class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  createNote = async (req, res) => {
    const payload = { ...req.body };
    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }
    try {
      const note = await this.noteService.createNote(payload);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  getNoteByUserId = async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({
          status: 'ERROR',
          message: 'userId es requerido (query ?userId=...)',
        });
      }
      const notes = await this.noteService.getNoteByUserId(userId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  getNoteById = async (req, res) => {
    try {
      const note = await this.noteService.getNoteById(req.params.id);
      if (!note) {
        return res.status(404).json({ status: 'ERROR', message: 'Nota no encontrada' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  updateNote = async (req, res) => {
    const payload = { ...req.body };
    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }
    try {
      const note = await this.noteService.updateNote(req.params.id, payload);
      if (!note) {
        return res.status(404).json({ status: 'ERROR', message: 'Nota no encontrada' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  deleteNote = async (req, res) => {
    try {
      const deleted = await this.noteService.deleteNote(req.params.id);
      if (!deleted) {
        return res.status(404).json({ status: 'ERROR', message: 'Nota no encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ status: 'ERROR', message: error.message });
    }
  };

  getPublicNoteById = async (req, res) => {
    try {
      const note = await this.noteService.getPublicNoteById(req.params.id);
      if (!note) {
        return res.status(404).json({ status: 'ERROR', message: 'Nota no encontrada' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(403).json({ status: 'ERROR', message: error.message });
    }
  }
}
