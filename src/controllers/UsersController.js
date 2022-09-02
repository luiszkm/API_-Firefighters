const AppError = require('../utils/AppError');
const knex = require("../database/knex")
const sqliteConnection = require("../database/sqlite")
const { hash , compare } = require('bcryptjs');


class UsersController {

  async create(req, res) {
    
    const { name, email, password, admin} = req.body
    
    const database = await sqliteConnection()
    const userExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userExists) {
      throw new AppError("Este email já esta cadastrado")

    }

    const hashedPAssword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password , admin) VALUES (?, ?, ? ,?)",
      [name, email, hashedPAssword,admin])


    if (!name || name === "" || name === null) {
      throw new AppError("Nome é obrigatório")
    }

   return res.status(200).json({ name, email, password ,admin})
  }

  async update(req, res) {

    const { name, email, password , old_password } = req.body

    const user_id = req.user.id

    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError('Voce precisa informar a senha antiga para redefinir a senha')
    }
 
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('senha não confere')
      }
      user.password = await hash(password, 8)
    }

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

  async updateAdm(req, res) {

    const {  email, password  } = req.body

    const {id} = req.params
    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso")
    }
    console.log(user.password);

  
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

module.exports = UsersController;