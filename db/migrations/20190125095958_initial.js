
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.string('name');

      table.timeStamps(true, true);
    }),

    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary();
      table.integer('color_1');
      table.integer('color_2');
      table.integer('color_3');
      table.integer('color_4');
      table.integer('color_5');
      table.foreign('project_id')
        .references('projects.id');

      table.timeStamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects')
  ])
};
