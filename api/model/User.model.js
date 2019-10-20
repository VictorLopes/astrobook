var UserSchema = require('../schemas/User.schema');


module.exports = class User {

    insert(info) {
        return new Promise((resolve, reject) => {
            let user = new UserSchema(info);
            user.save((err, result) => {
                if (err) reject('Error while saving user in database!');
                resolve(result !== null && Object.keys(result).length > 0);
            });
        });
    }

    login(info) {
        return new Promise((resolve, reject) => {
            let { username, password } = info;
            UserSchema.findOne().and({ 'password': password }).or([{ 'nickname': username }, { 'email': username }])
                .exec(function (err, result) {
                    if (err) reject('Erro during login!');
                    console.log(result);
                    resolve(result !== null && Object.keys(result).length > 0 && result);
                });
        });
    }
};