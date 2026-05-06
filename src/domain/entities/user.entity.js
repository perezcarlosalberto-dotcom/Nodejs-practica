export default class UserEntity {
    constructor(data = {}) {
        const { id, name, email, password, role } = data;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role ?? 'user';
    }
}
