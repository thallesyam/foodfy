const db = require('../../config/db')

module.exports = {
  all(callback){
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
  show(id, callback){
    db.query(`SELECT * FROM chefs WHERE id = $1`, [id], function(err, results){
      if(err) `Database error ${err}`

      callback(results.rows[0])
    })
  }
}