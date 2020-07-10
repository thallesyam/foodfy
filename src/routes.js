const express = require('express')
const routes = express.Router()
const AdminRoutesRecipes = require('./app/Controllers/Recipes/Admin')
const UserRoutesRecipes = require('./app//Controllers/Recipes/User')

const AdminRoutesChefs = require('./app/Controllers/Chefs/Admin')
const UserRoutesChefs = require('./app//Controllers/Chefs/User')

//Pagina principal
routes.get('/', UserRoutesRecipes.index)


//User Routes Recipes

routes.get('/recipes', UserRoutesRecipes.allRecipes)
routes.get("/recipes/:id", UserRoutesRecipes.show)
routes.get('/about', UserRoutesRecipes.about)

//Admin routes recipes
routes.get("/admin/recipes", AdminRoutesRecipes.index);
routes.get("/admin/recipes/create", AdminRoutesRecipes.create); 
routes.get("/admin/recipes/:id", AdminRoutesRecipes.show); 
routes.get("/admin/recipes/:id/edit", AdminRoutesRecipes.edit); 

routes.post("/admin/recipes", AdminRoutesRecipes.post);
routes.put("/admin/recipes", AdminRoutesRecipes.put); 
routes.delete("/admin/recipes", AdminRoutesRecipes.delete); 

//User Routes Chefs
routes.get('/chefs', UserRoutesChefs.allChefs)

//Admin routes chefs
routes.get("/admin/chefs", AdminRoutesChefs.index);
routes.get("/admin/chefs/create", AdminRoutesChefs.create); 
routes.get("/admin/chefs/:id", AdminRoutesChefs.show); 
routes.get("/admin/chefs/:id/edit", AdminRoutesChefs.edit); 

routes.post("/admin/chefs", AdminRoutesChefs.post);
routes.put("/admin/chefs", AdminRoutesChefs.put); 
routes.delete("/admin/chefs", AdminRoutesChefs.delete); 


module.exports = routes
