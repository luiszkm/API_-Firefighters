let today = new Date();
const now = today.toLocaleString();

exports.up = knex => knex.schema.createTable("attendance", table => {
  table.increments("id");
  table.integer("called_id").references("id").inTable("called").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")

  table.text("pa1")
  table.time("timePa1")
  table.text("pa2")
  table.time("timePa2")
  table.text("temperature")
  table.text("pulse")
  table.text("spo2")
  table.text("victim_destiny")
  table.text("descriptions")
  
  table.timestamp("created_at").default(now);
});

exports.down = knex => knex.schema.dropTable("attendance");