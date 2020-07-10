const db = require('../../config/db')
const {formateDate} = require('../../lib/utils')

module.exports = {
  all(callback){
    db.query(`SELECT * FROM chefs`, function(err, results){
      if(err) `Database error ${err}`

      callback(results.rows)
    })
  },
  find(id, callback){
    db.query(`
    SELECT chefs.* FROM chefs 
    WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database error ${err}`

      callback(results.rows[0])
    })
  },
  create(data, callback){
    const query = `
      INSERT INTO chefs(
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `
    const values = [
      data.name,
      data.chefe_url,
      formateDate(Date.now()).iso
    ]

    db.query(query, values, function(err, results){
      if(err) `Database error ${err}`

      callback(results.rows[0])
    })
  },
  update(data, callback){
    const query = `
      UPDATE chefs SET
        name = ($1),
        avatar_url = ($2)
      WHERE id = $3
    `
    
    const values = [
      data.name,
      data.chefe_url,
      data.id
    ]
    
    console.log(data.id)

    db.query(query, values, function(err){
      if(err) throw `Database error ${err}`

      callback()
    })
  },
  delete(id, callback){
    db.query(`DELETE FROM chefs WHERE id = $1 `, [id], function(err){
      if(err) throw `Database error ${err}`

      callback()
    })
  },
  findRecipesBychef(id, callback){
    db.query(`SELECT * FROM recipes WHERE chef_id = $1`,[id], function(err, results){
      if(err) `Database error ${err}`

      callback(results.rows)
    })
  },
  totalRecipes(callback){
    db.query(`
    SELECT chefs.*, count(recipes) AS total_recipe
    FROM chefs
    LEFT JOIN recipes on (chefs.id = recipes.chef_id)
    GROUP BY chefs.id`, function(err, results) {
      if(err) `Database error ${err}`
      
      callback(results.rows)
    })
  }
}