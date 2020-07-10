const currentPage = location.pathname

const aElement = document.querySelectorAll('header a')


for(item of aElement){
  if(currentPage.includes(item.getAttribute('href'))){
    item.classList.add('bold')
  }
}