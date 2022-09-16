const knex = require("../database/knex")
const AppError = require('../utils/AppError');
const { hash , compare } = require('bcryptjs');

const sqliteConnection = require("../database/sqlite")


class AdmController {

  async show(req, res) {

    const called = await knex("called")


    return res.json({ called })
  }
  async showUsers(req, res) {

    const users = await knex("users")
    
/*
    const users = await knex
      .select([
        'called.*',
        'users.*'
      ])
      .from("users")
      .innerJoin('called', 'called.user_id', 'users.id')
      .where('called.id', [id]).first()
*/
   




    return res.json({
      users
    })
  }

  async showUser(req, res) {

    const {id} = req.params
    const user = await knex("users")
    .where({id})



    return res.json(
      ...user
    )
  }

  async updateAdm(req, res) {

    const {  email, password, name  } = req.body

    const {id} = req.params

    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])
    console.log(user);
    if (!user) {
      throw new AppError("Usuário não encontrado")
    }
    user.name = name ?? user.name
    user.email = email ?? user.email

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso")
    }

  
      user.password = await hash(password, 8)
    

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?
    `, [user.name, user.email, user.password, user.id])

  
    return res.json()
  }

}

module.exports = AdmController