import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
  const {category} = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([categoriesMap[category]]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  },[category, categoriesMap]);

  useEffect(() => {
    //console.log(categoriesMap);
  }, [products]);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  return(
    <Fragment>
      <h1 className="category-title">{category.toUpperCase()}</h1>
      <div className="category-container">
        {!isEmpty(categoriesMap) ?
        (products && 
            products.map((product) => <ProductCard key={product.id} product={product} />)
        )
        : null
        }
      </div>
    </Fragment>
  )
}

export default Category