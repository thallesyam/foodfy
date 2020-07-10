const db = require('../../config/db')
const {formateDate} = require('../../lib/utils')

module.exports = {
  all(callback){
    db.query(`SELECT * from recipes`, function(err, results) {
      if(err) throw `Database error ${err}`

      callback(results.rows)
    })
  },
  find(id, callback){
    db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function(err, results){
      if(err) throw `Database error ${err}`

      callback(results.rows[0])
    })
  },
  post(data, callback) {
    const query = `
      INSERT INTO recipes(
        image,
        title,
        ingredients,
        preparation,
        information,
        chef_id,
        created_at
      ) VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `
    const values = [
      data.recipe_url,
      data.title,
      data.ingredients,
      data.passos,
      data.info_add,
      data.chef_id,
      formateDate(Date.now()).iso
    ]

    db.query(query, values, function(err, results){
      if(err) `Database error ${err}`

      callback(results.rows[0])
    })

  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
        image = ($1),
        title = ($2),
        ingredients = ($3),
        preparation = ($4),
        information = ($5),
        chef_id = ($6)
      WHERE id = $7
    `

    const values = [
      data.recipe_url,
      data.title,
      data.ingredients,
      data.passos,
      data.info_add,
      data.chef_id,
      data.id
    ]

    db.query(query, values, function(err){
      if(err) `Database error ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err){
      if(err) `Database error ${err}`
      
      callback()
    })
  },
  recipesOptions(callback){
    db.query(`SELECT name, id FROM chefs`, function(err, results){
      if(err) throw `Database error ${err}`

      callback(results.rows)
    })
  },
  findNameAndId(callback){
    db.query(`SELECT name, id FROM chefs`, function(err, results){
      if(err) throw `Database error ${err}`

      callback(results.rows)
    })
  }
}