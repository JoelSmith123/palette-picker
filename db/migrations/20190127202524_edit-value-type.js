exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('palettes', function(table) {
      table.string('color_1').alter();
      table.string('color_2').alter();
      table.string('color_3').alter();
      table.string('color_4').alter();
      table.string('color_5').alter();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.dropColumn('color_1');
      table.dropColumn('color_2');
      table.dropColumn('color_3');
      table.dropColumn('color_4');
      table.dropColumn('color_5');
    })
  ])
};
