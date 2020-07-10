const AdminRecipe = require('../../../models/Users/userChef')


module.exports = {

  allChefs(req, res){
    AdminRecipe.all(function(chefs){
      
      return res.render('User/Chefs/chefs', {items: chefs})
    })
  }
}