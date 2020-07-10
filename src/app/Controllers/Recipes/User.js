const UserRecipe = require('../../../models/Users/userRecipe')

module.exports = {
  // Receita  

  index (req, res){
    UserRecipe.all(function(chef){
      const arrayMostra = chef.slice(0, 3)

      UserRecipe.allChefs(function(name){
        return res.render('User/Recipes/home.njk', {items: chef, chefs: name, arraySlice: arrayMostra})
      })
    })
    
  },
  allRecipes(req, res) {
    let {filter, page, limit} = req.query

    page = page || 1
    limit = limit || 3
    let offset = limit * (page - 1)
    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipe){
        
        let pagination = {
          total: 0,
          page
        }

        if(recipe.length >= 1){
          pagination = {
            ...pagination,
            total: Math.ceil(recipe[0].total / limit),
          }
        }else{
          pagination = pagination
        }

        if(!filter){
          filter = ''
        }
        
        return res.render('User/Recipes/receitas', {items: recipe, pagination, filter})
      }
    }

    UserRecipe.paginate(params, )

  },
  show(req, res) {
    const id = req.params.id
    
    UserRecipe.show(id, function(recipe){
      if(!recipe) return res.status(404).send('Error id is not exist')

      UserRecipe.allChefs(function(chefs){
        const findChef = chefs.find(item => recipe.chef_id == item.id)

        return res.render('User/Recipes/receita', {item: recipe, chefs: findChef})
      })
    })

  },
  about(req, res){
    return res.render('User/Recipes/sobre.njk')
  }
}