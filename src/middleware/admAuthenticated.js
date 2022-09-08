const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { verify } = require("jsonwebtoken");
const authConfig = require("../config/auth");

async function AdmAuthenticated(req, res, next) {
 
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT não informado", 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)
    
    req.user = {
      id: Number(user_id),
     
    }
    const userAdm = await knex('users').where({id: Number(user_id) });

 
    const isAdmin = userAdm[0].admin == 1;

    if (!isAdmin) {
      throw new AppError('Você não é um administrador', 401);
      
    }

    return next()
  } catch {
    throw new AppError("JWT token invalido", 401)
  }


  
}

module.exports = AdmAuthenticated;