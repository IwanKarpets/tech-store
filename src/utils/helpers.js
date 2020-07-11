import url from './URL'


// helper functions
export function flattenProducts(data){
  return data.map(item=>{
    let image =`${url}${item.image[0].url}`
    return {...item, image};

  })
}

export function featuredProducts(data) {
  return data.filter(item => {
    return item.featured === true;
  });
}



export function paginate(products){ 
  const itemPerPage = 4;
  const numberOfPages = Math.ceil(products.length/itemPerPage);
  console.log(numberOfPages);
  // const newProducts = Array.from({length:numberOfPages}, ()=>{
  //   return products.splice(0,itemPerPage)
  // })
  
  const newProducts = Array.from({length: numberOfPages},(_,index)=>{
    const start = index *itemPerPage;
    return products.slice(start, start+itemPerPage)
  })

  //console.log(newProducts)
  return newProducts;
}
