const db = require('../../config/db')

module.exports = {
  all(callback){
    db.query(`SELECT * from recipes`, function(err, results){
      if(err) `Database error ${err}`

      callback(results.rows)
    })
  },
  show(id, callback){

    db.query(`SELECT * from recipes WHERE id  = $1`, [id], function(err, results){
      if(err) throw `Database error ${err}`
      
      callback(results.rows[0])
    })
  },
  findBy(filter, callback){
    db.query(`
      SELECT recipes.* FROM recipes 
      WHERE recipes.title ILIKE '%${filter}%'
      `,
      function(err, results){
        if(err) `Database error ${err}`

        callback(results.rows)
      }
    )
  },
  allChefs(callback){
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipe
      FROM chefs
      LEFT JOIN recipes on (chefs.id = recipes.chef_id)
      GROUP BY chefs.id`,
      function(err, results){
        if(err) `Database error ${err}`

        callback(results.rows)
      }
    )
  },
  paginate(params){
    const {filter, limit, offset, callback} = params

    let query = "",
        filterQuery = '',
        totalQuery = `(
          SELECT count(*) FROM recipes
        ) AS total `
          
    if(filter){
      filterQuery = `
        WHERE recipes.title ILIKE '%${filter}%'
      `

      totalQuery = `(
        SELECT count(*) FROM recipes 
        ${filterQuery}
      ) as total`
    }

    query = `
        SELECT *, ${totalQuery}
        FROM recipes
        ${filterQuery}
        GROUP BY recipes.id LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], function(err, results){
      if(err) throw `Database error ${err}`
      callback(results.rows)
    })
  }
}