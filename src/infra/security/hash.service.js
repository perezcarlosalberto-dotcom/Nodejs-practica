import bcrypt from 'bcryptjs';

export default class HashService {
    static async hash(password) {
        return await bcrypt.hash(password, 10);
    }

    static async compare(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
