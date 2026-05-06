import UserModel from './user.model.js';

export default class UserMongoRepository {
    async save(user) {
        const plain = {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role ?? 'user',
        };
        return await UserModel.create(plain);
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findById(id) {
        return await UserModel.findById(id);
    }

    async update(id, user) {
        return await UserModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}
