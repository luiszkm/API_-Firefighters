const knex = require("../database/knex")

class AddressController {
  async create(req, response) {

    const { street, number, district, city } = req.body

    const user_id = req.user.id
    const { called_id } = req.query

    await knex("address")
      .insert({ street, number, district, city, user_id, called_id })
      

    return response.json()
  }

  async update(req, res) {
    const { street, number, district, city } = req.body

    const { id } = req.params

    await knex("address").where({ id })
      .update({ street, number, district, city })

    return res.json()
  }



  async show(request, response) {
    const { id } = request.params

    const note = await knex("called").where({ id }).first()
    const tags = await knex("tags").where({ note_id: id })
      .orderBy("name")
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at")

    return response.json({
      ...note,
      tags,
      links
    })
  }


  async index(request, response) {
    const { name, tags } = request.query
    const user_id = request.user.id

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.name',
          'notes.user_id'
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.name', `%${name}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .groupBy('notes.id')
        .orderBy('notes.name');
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name")
    }

    const userTags = await knex('tags')
      .where({ user_id })

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags,
      }
    })

    return response.json(notesWithTags)

  }

}

module.exports = AddressController