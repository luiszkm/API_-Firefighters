let today = new Date();
const now = today.toLocaleString();

exports.up = knex => knex.schema.createTable("procedures", table => {
  table.increments("id");
  table.integer("called_id").references("id").inTable("called").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")

  table.text("procedures_name").notNullable()
  
  table.timestamp("created_at").default(now);
});

exports.down = knex => knex.schema.dropTable("procedures");