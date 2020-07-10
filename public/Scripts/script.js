// não é o melhor método a se fazer, procurar nova forma depois

const element1 = document.querySelector('#element1')
const ulElement = document.querySelector('ul')

const element2 = document.querySelector('#element2')
const ulElement2 = document.querySelector('#ulElement2')

const element3 = document.querySelector('#element3')
const ulElement3 = document.querySelector('#ulElement3')


element1.addEventListener("click", function(){
  ulElement.classList.toggle('esconder')
})

element2.addEventListener("click", function(){
  ulElement2.classList.toggle('esconder')
})

element3.addEventListener("click", function(){
  ulElement3.classList.toggle('esconder')
})

