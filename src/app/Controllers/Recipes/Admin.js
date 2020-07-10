const Recipes = require('../../../models/Admins/Recipes')

module.exports = {
  // Rotas para CRUD de receitas e chefes
  index(req, res){
    Recipes.all(function(recipes){
      Recipes.findNameAndId(function(chef){
        const findChef = chef.map(item => item)
        return res.render('Admin/Recipes/listagem', {items: recipes, chefs: findChef})
      })

    })
  },
  create(req, res){
    Recipes.recipesOptions(function(options){
      return res.render('Admin/Recipes/create.njk', {items: options})
    })

  },
  show(req, res){
    const id = req.params.id 

    Recipes.find(id, function(recipes){
      if(!recipes) return res.status(404).send('Error recipe not found')

      Recipes.recipesOptions(function(options){
        
        const returnId = options.find(item => item.id == recipes.chef_id)

        return res.render('Admin/Recipes/detalhe.njk', {item: recipes, opt: returnId})

      })
    })


  },
  edit(req, res){
   const id = req.params.id

   Recipes.find(id, function(recipes){
    if(!recipes) return res.status(404).send('Error recipe not found')

    Recipes.recipesOptions(function(options){
      return res.render('Admin/Recipes/edit.njk', {item: recipes, items: options})
    })

  }) 
  },
  post(req, res){
    let index = 1
    
    // removendo item vazio caso o usuario envie
    req.body.ingredients.find((vazio, foundIndex) => {
      if(vazio == "") {
        index = foundIndex
        return req.body.ingredients.splice(index, 1)
      }
    })

    req.body.passos.find((vazio, foundIndex) => {
      if(vazio == "") {
        index = foundIndex
        return req.body.passos.splice(index, 1)
      }
    })

    Recipes.post(req.body, function(recipe){

      

      return res.redirect(`/admin/recipes/${recipe.id}`)
    })

    
  },
  put(req, res){
    const {id} = req.body

    let index = 1

    req.body.ingredients.find((vazio, foundIndex) => {
      if(vazio == "") {
        index = foundIndex
        return req.body.ingredients.splice(index, 1)
      }
    })

    req.body.passos.find((vazio, foundIndex) => {
      if(vazio == "") {
        index = foundIndex
        return req.body.passos.splice(index, 1)
      }
    })

    Recipes.update(req.body, function(recipes) {
      return res.redirect(`/admin/recipes/${id}`)
    })
  },
  delete(req, res){
    Recipes.delete(req.body.id, function(){

      return res.redirect('/Admin/recipes')
    })

  }
  

}