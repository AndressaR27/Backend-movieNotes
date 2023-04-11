
const knex = require("../database/Knex");

class MovieNotesController {
    async create (request, response){
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

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
        const { title, tags, order } = request.query;
        const user_id = request.user.id
        // >>>>> TAREFA 1 <<<<<
        // order pode ter os valores ['ASC' OU 'DESC']
        // ASC  - Ordenação de A-Z no titulo
        // DESC - Ordenação de Z-A no titulo

        // >>>>> TAREFA 2 <<<<<
        // Esta controller parece estar muito grande.
        // Pense para que serve uma controller e qual a melhor forma de encapsular as diferentes lógicas em outros lugares

        // >>>>> TAREFA 3 <<<<<
        // Crie uma nova rota: GET /listar-tudo
        // Essa rota deve retornar TODOS os valores do banco
        // Essa rota deve implementar uma paginação
        // Os seguintes parâmetros podem ser passados como query params:
        //   - page -> página atual, considerar 1 se não for informado
        //   - size -> número de itens por página, considerar 10 se não for informado
        //
        // Exemplo de chamada: GET localhost:3000/lista-tudo?page=3&size=20
        //
        // Formato do retorno:
        // {
        //    metadata: {
        //       page: <numero da pagina atual>,
        //       size: <numero de elementos>,
        //       total: <numero total de itens>
        //    },
        //    payload: <lista com os itens da pagina>
        // }

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
        .orderBy("movieNotes.title", order)

        } else {
            notes = await knex("movieNotes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title", order)
        }

        const userTags = await knex("movieTags").where({ user_id })
        const notesWithTags = notes.map(note =>{
            const noteTags = userTags.filter( tag => tag.note_id === note.id);
        
            return  {
                ...note,
                tags: noteTags
            }
        });
        return response.json(notesWithTags);
    }
}
module.exports = MovieNotesController;