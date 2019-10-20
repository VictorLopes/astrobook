var UserSchema = require('../schemas/User.schema');


module.exports = class User {

    insert(info) {
        let user = new UserSchema(info);
        user.save();
    }

    login() {
        let name = `Igão`;
        userSchema.find({ name: new RegExp(name, 'i') });
    }
};