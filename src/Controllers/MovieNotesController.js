const knex = require("knex");

class MovieNotesController {
    async create (request, response){
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        const note_id = await knex("movieNotes").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags.map(name => {
            note_id,
            user_id,
            name
        })

        await knex("movieTags").insert(tagsInsert);

        response.json();

    }

}

module.exports = MovieNotesController;