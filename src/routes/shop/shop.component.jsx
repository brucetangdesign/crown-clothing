import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    const toTitleCase = (word) => {
        return word.split(' ').map(letters => (letters.charAt(0).toUpperCase() + letters.slice(1)));
    }

    return(
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => (
                    <Fragment key={categoriesMap[title].id}>
                        <h2>{toTitleCase(title)}</h2>
                        <div className='products-container'>
                            {
                                categoriesMap[title].map((product, index) => (
                                    index < 4 ? <ProductCard key={product.id} product={product} /> : null
                                ))
                            }
                        </div>
                    </Fragment>
                )
            )}
        
        </Fragment>
    );
}

export default Shop;