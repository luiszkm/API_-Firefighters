exports.up = knex => knex.schema.createTable("wound", table => {
  table.increments("id");
  table.integer("called_id").references("id").inTable("called").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")

  table.text("wound_name").notNullable()
  table.text("wound_local")
  
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("wound");