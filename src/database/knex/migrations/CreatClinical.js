exports.up = knex => knex.schema.createTable("clinical", table => {
  table.increments("id");
  table.integer("called_id").references("id").inTable("called").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")

  table.text("name").notNullable()
  
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("clinical");