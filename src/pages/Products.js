import React, { useContext } from "react";
import { ProductContext } from "../context/products";
import Loading from "../components/Loading";
import ProductList from "../components/Products/ProductList";
import Filters from '../components/Filters';
import PageProduct from '../components/PageProduct';
export default function Products() {
  const { loading, sorted } = React.useContext(ProductContext);
 
  if (loading) {
    return <Loading />;
  }
  return(
    <>
    <Filters/>
    <PageProduct/>
    </>
  ) 
}
