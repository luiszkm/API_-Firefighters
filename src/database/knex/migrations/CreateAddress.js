let today = new Date();
const now = today.toLocaleString();

exports.up = knex => knex.schema.createTable("address", table => {
  table.increments("id");

  table.integer("called_id").references("id").inTable("called").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")

  table.text("street");
  table.text("number");
  table.text("district");
  table.text("city")  

  table.timestamp("created_at").default(now);
  table.timestamp("updated_at").default(now);
});

exports.down = knex => knex.schema.dropTable("address");