
const knex = require("../database/Knex");

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

        // console.log(note_id); Irá retorar somente o note_id da nota criada. 

        const tagsInsert = tags.map(name => ({
                note_id,
                user_id,
                name
                })
        )

        await knex("movieTags").insert(tagsInsert);

        // const table =  await knex.select("title", "description", "rating", "user_id", "id").from("movieNotes")
        // console.log(table)

        
        return response.json();
    }

    async show (request, response){
        const { id } = request.params;

        const note = await knex("movieNotes").where({ id }).first();
        const tags = await knex("movieTags").where({ note_id: id}).orderBy("name")

        // console.log(note)
        return response.json({
            ...note,
            tags
        })
    }

    async delete (request, response){
        const { id } = request.params;

        await knex("movieNotes").where({ id }).delete();

        response.json();
    }

    async index (request, response){
        const { user_id, title, tags } = request.query;

    let notes;

        // const tableTags = await knex.select("note_id", "user_id", "name", "id").from("movieTags")
        // console.log(tableTags)

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim()); //Para virar um vetor
        //    console.log(filterTags)
        notes = await knex("movieTags")
        .select([
            "movieNotes.id",
            "movieNotes.title",
            "movieNotes.user_id",
        ])
        .where("movieNotes.user_id", user_id)
        .whereLike("movieNotes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movieNotes", "movieNotes.id", "movieTags.note_id")
        .orderBy("movieNotes.title")

        // console.log(notes)


        } else {
            notes = await knex("movieNotes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title")
        }

        const userTags = await knex("movieTags").where({ user_id })
        const notesWithTags = notes.map(note =>{
            const noteTags = userTags.filter( tag => tag.note_id === note.id);
        
            return {
                ...note,
                tags: noteTags
            }
        });

        return response.json(notesWithTags);
        
    }
}

module.exports = MovieNotesController;