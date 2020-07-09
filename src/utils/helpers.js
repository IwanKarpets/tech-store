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
