const { json } = require("express")
const knex = require("../database/knex")

class AttendanceController {
  async create(req, res) {

    const {
      pa1, timePa1, pa2, timePa2,
      temperature, pulse, spo2,
       procedures , used_material,
       victim_destiny,descriptions,
    } = req.body

    const user_id = req.user.id
    //const { called_id } = req.query
    const called_id = await knex("called")
   
    


    await knex("attendance")
      .insert({ user_id, called_id, pa1, timePa1, pa2, timePa2,
        temperature, pulse, spo2, victim_destiny,descriptions})



        const proceduresInsert = procedures.map(procedures => {
          return {
            user_id,
            procedures_name:procedures,
            called_id,
          }
        })

        
        await knex("procedures").insert(proceduresInsert)

        
        const used_materialInsert = used_material.map(material => {
          return {
            user_id,
            material_name:material.name,
            material_amount:material.amount,
            called_id,
          }
        })
        
        await knex("used_material").insert(used_materialInsert)
    

    return res.json()
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

module.exports = AttendanceController