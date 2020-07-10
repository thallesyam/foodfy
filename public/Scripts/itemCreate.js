function addIngrediente(){
  const ingredientsElement = document.getElementById('ingredients')
  const ingredientEl = document.querySelectorAll('.ingredient')
  const newField = ingredientEl[ingredientEl.length - 1].cloneNode(true)

  if(newField.children[0].value == "") return false

  newField.children[0].value = ""
  ingredientsElement.appendChild(newField)
}

document
  .querySelector('.add-ingredient')
  .addEventListener('click', addIngrediente)

function addPasso(){
  const passos = document.getElementById('passos')
  const passoEl = document.querySelectorAll('.passo')
  const newField = passoEl[passoEl.length - 1].cloneNode(true)

  if(newField.children[0].value == '')return false

  newField.children[0].value = ""
  passos.appendChild(newField)
}

document
  .querySelector('.add-passo')
  .addEventListener('click', addPasso)

