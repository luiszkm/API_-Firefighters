let today = new Date();
const now = today.toLocaleString();

exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.text("name");
  table.text("email");
  table.text("password");
  table.enum("admin",[0,1]).default(0);
  table.text("avatar");
  table.timestamp("created_at").default(now);
  table.timestamp("updated_at").default(now);
});


exports.down = knex => knex.schema.dropTable("users");