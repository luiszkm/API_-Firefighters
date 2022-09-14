exports.up = knex => knex.schema.createTable("called", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users")
  
  table.text("type");
  table.text("victim_name");
  table.integer("age");
  table.text("phone");
  table.enum("sexo",['M','F'])
  table.text("rg")
  table.text("escortName")
  table.text("escortPhone")
  table.text("medicines")



  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("called");