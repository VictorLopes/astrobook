var PublicationSchema = require('../schemas/Publication.schema');

module.exports = class Publication {

    get(id) {
        return new Promise((resolve, reject) => {
            PublicationSchema.findOne().exec(function (err, result) {
                console.log(result);
                if (err) reject('Erro during login!');
                resolve(result !== null && Object.keys(result).length > 0);
            });
        });
    }

    insert(info) {
        return new Promise((resolve, reject) => {
            let { title, description, cover, photos } = info;
            let publication = new PublicationSchema({
                title,
                description,
                cover,
                photos
            });

            publication.save((err, result) => {
                if (err) reject('Error while saving publication in database!');
                resolve(result !== null && Object.keys(result).length > 0);
            });
        });
    }

};