const AppError = require('../utils/AppError');
const knex = require("../database/knex")
const sqliteConnection = require("../database/sqlite")
const DiskStorage = require('../providers/DiskStorage');

const diskStorage = new DiskStorage()


class ProductsController {

  async create(req, res) {
    const { title, price, description, ingredients, inventory, category } = req.body

    const database = await sqliteConnection()

    //const productFilename = req.file.filename;

    const titleExists = await database.get("SELECT * FROM products WHERE title = (?)", [title])

    if (titleExists) {
      throw new AppError("produto já cadastrado")
    }

    if (!title || title.length === 0 || title === undefined) {
      throw new AppError("Não e possível cadastrar um produto sem nome")
    }

   // const filename = await diskStorage.saveFile(productFilename)

    const product_id = await knex("products").insert({
      title,
      price,
      description,
      inventory,
      category,
     // image:filename
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        product_id,
        name
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const product = await knex("products").where({ id }).first()
    const ingredient = await knex("ingredients").where({ product_id: id }).orderBy("name")

    return res.json({
      ...product,
      ingredient

    });
  }

  async update(req, res) {
    const { title, price, description, inventory } = req.body
    const { id } = req.params;

    const productFilename = req.file.filename;

    const product = await knex("products")
    .select("*")
    .where({ id: id })
    .first()


    if (!product || product.length === 0) {
      throw new AppError("Produto não encontrado")
    }

    if (product.image) {
      await diskStorage.deleteFile(product.image)
    }

    const filename = await diskStorage.saveFile(productFilename)


    product.title = title ?? product.title
    product.price = price ?? product.price
    product.description = description ?? product.description
    product.inventory = inventory ?? product.inventory
    product.image = filename  ?? product.image

    await knex("products")
      .where({ id: id })
      .update({
        title: product.title,
        price: product.price,
        description: product.description,
        inventory: product.inventory,
        image: product.image,
        updated_at: new Date()
      })

   return res.json()
  }

  async delete(req, res) {

    const { id } = req.params

    console.log(id);
    let teste =await knex("products")
    .where({ id:id })
    .delete()

    return res.json({teste})

  }

  async index(req, res) {
    const { title, ingredients,product_id } = req.query

    let product

    if (ingredients) {
      const filterIngredients = ingredients.split(',')
        .map(ingredient => ingredient.trim());

      product = await knex("ingredients")
        .select([
          "products.id",
          "products.title",
          "products.price",
        ])
        .whereLike("products.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("products", "products.id", "ingredients.product_id")
        .orderBy("products.title")

    } else {
      product = await knex("products")
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const productIngredients = await knex("ingredients")
      .where({ product_id })
    

    const productWithIngredient = product.map(product => {
      const ingredientsProduct = productIngredients.filter(ingredient => ingredient.product_id === product.id)
     
      return {
        ...product,
        ingredients: ingredientsProduct
      }

    })



    return res.json(productWithIngredient)

  }

  
}
module.exports = ProductsController;