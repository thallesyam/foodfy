const Chefs = require('../../../models/Admins/Chefs')


module.exports = {
  index(req, res){
    Chefs.all(function(chefs){
      return res.render('Admin/Chefs/listagem', {items: chefs})
    })
  },
  show(req, res){
    const id = req.params.id
  
    Chefs.find(id, function(chefs){
      if(!chefs) return res.status(404).send('Error')

      Chefs.findRecipesBychef(id, function(recipe){
        Chefs.totalRecipes(function(count){
          const countTotal = count.find(item => item.id == chefs.id)

          return res.render('Admin/Chefs/chef', {item: chefs, recipes: recipe, totalRecipes: countTotal})
        })
      })

    })
  },
  create(req, res){
    return res.render('Admin/Chefs/create')
  },
  post(req, res){
    Chefs.create(req.body, function(chefs) {
      return res.redirect(`/Admin/chefs/${chefs.id}`)
    })
  },
  edit(req, res){
    const {id} = req.params

    Chefs.find(id, function(chefs) {
      return res.render(`Admin/Chefs/edit`, {item: chefs})
    })
  },
  put(req, res){
    const {id} = req.body

    Chefs.update(req.body, function(chefs){
      return res.redirect(`/Admin/chefs/${id}`)
    })
  },
  delete(req, res){
    Chefs.totalRecipes(function(chef){
      for(let recipe of chef){
        if(recipe.total_recipe >= 1){
          return res.status(404).send(`Error: this chef has at least one recipe`)
        }else{
          Chefs.delete(req.body.id, function(){
      
            return res.redirect('/Admin/Chefs')
          })
        } 
      }
    })
  }
}