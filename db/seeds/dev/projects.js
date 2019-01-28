exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())

    .then(() => {
      return Promise.all([
        
        knex('projects').insert({
          name: 'Project 1'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { id: 1,
              name: 'Palette 1',
              color_1: '7DDF64', 
              color_2: 'C0DF85',
              color_3: 'DEB986',
              color_4: 'DB6C79',
              color_5: 'ED4D6E',
              project_id: project[0] },
            { id: 2,
              name: 'Palette 2',
              color_1: '585123', 
              color_2: 'EEC170',
              color_3: 'F2A65A',
              color_4: 'F58549',
              color_5: '772F1A', 
              project_id: project[0] },
            { id: 3,
              name: 'Palette 3',
              color_1: 'E0F2E9', 
              color_2: 'CEB5A7',
              color_3: 'A17C6B',
              color_4: '5B7B7A',
              color_5: '3C887E', 
              project_id: project[0] },
            
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};