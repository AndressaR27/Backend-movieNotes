
const knex = require("../database/Knex");

class DatabaseListController {
    async allList(request, response) {
        const allUsers = await knex("users").select([
            "id",
            "name",
            "email"
        ])
        // console.log(`>>>`, allUsers)

        const AllTags = await knex("movieTags")
        const allNotes = await knex("movieNotes")

        const userWithNotes = allUsers.map(user => {
           const filterNotes = allNotes.filter(note => note.user_id === user.id)
        //    console.log(filterNotes) // retorna um array
           return {
            user,
            notes: filterNotes
           }
        })
        // console.log(`>>>>`, json.stringify(userWithNotes))

        const userWithNotesAndTags = userWithNotes.map(item => {
            const tags = item.notes.map(note => {
                const filterTags = AllTags.filter( tag => tag.note_id === note.id)
                return { ...note, filterTags}
            }) 
            return {
                ...item,
                notes: tags
            }
        })

        const { page, size } = request.query;
        const total = allUsers.length
    

        const result = {
            metadata: {page, size, total},
            payload: userWithNotesAndTags
        }
        
        return response.status(200).json(result)

    }
}
module.exports = DatabaseListController