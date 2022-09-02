const knex = require('../database/knex');
const sqliteConnection = require("../database/sqlite")
const AppError = require('../utils/AppError');

class FavoritesController {

  async create(req, res) {
    const user_id = req.user.id;
    const { product_id } = req.query;

    const database = await sqliteConnection()

    const user = await knex("users").where({ id: user_id });


    const product = await knex("products")
      .select("title", "price")
      .where({ id: product_id })
      .orderBy("title")

    const favoriteExists = await database.get("SELECT * FROM favorites WHERE product_id = (?)", [product_id])

    console.log(favoriteExists);

    if (favoriteExists) {
      throw new AppError("Este produto já está favoritado")
    }

    await knex("favorites").insert({
      product_id,
      id: user_id
    })
    const favorites = await knex("favorites").where({ id: user_id })
    
    return res.json({
      favorites

    });
  }

  async show(req, res) {
    const id = req.user.id

    const user = await knex("users").select("name")
    .where({ id }).first()
    const favorites = await knex("favorites")
    .where({ id: id })
    .orderBy("created_at")
    
    const favorite = await knex.raw(`	SELECT 
   products.title,
   products.price,
   products.description,
   products.inventory,
   products.image
   FROM favorites 
   INNER JOIN  users 
   ON favorites.id = users.id
   INNER JOIN  products 
   ON favorites.product_id = products.id`)


   // const productsInsert = products.map(id => {
    //   console.log(id);
    //   return {
    //     // product_id,
    //     id
    //   }

    // })
    //console.log(productsInsert[4]);
    return res.json({
      ...user,
      favorite

    });
  }

  async delete(req, res) {
    const id = req.user.id
    const {product_id} = req.query

   const productForDelete = await knex("favorites")
   .where({id: id})
   .where({product_id: product_id})
   .delete()

   console.log(productForDelete);

    return res.json({})
  }

}

module.exports = FavoritesController;