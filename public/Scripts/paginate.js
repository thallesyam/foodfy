function paginate(selectedPage, totalPages){
  let pages= [], 
      oldPage = 0

  for(let currentPage = 1; currentPage <= totalPages; currentPage++){

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfter = currentPage <= selectedPage + 2
    const pagesBefore = currentPage >= selectedPage - 2

    if(firstAndLastPage || pagesAfter && pagesBefore){
      
      if(oldPage && currentPage - oldPage > 2){
        pages.push('...')
      }

      if(oldPage && currentPage - oldPage == 2){
        pages.push(oldPage + 1)
      }

      pages.push(currentPage) 
      oldPage = currentPage
    }
  }
  return pages
}

function createPagination(pagination){
  const filter = pagination.dataset.filter
  const page = +pagination.dataset.page
  const total = +pagination.dataset.total
  const pages = paginate(page, total)
  
  

  let elements = ''
  
  for(let page of pages){
    if(String(page).includes('...')){
      elements+= `<span>${page}</span>`
    }else{
      if(filter){
        elements+= `<a href='?page=${page}&filter=${filter}'>${page}</a>`
      }else{
        elements+= `<a href='?page=${page}'>${page}</a>`
  
      }
    }
  
  }

  pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')


createPagination(pagination)
if(pagination){
}



