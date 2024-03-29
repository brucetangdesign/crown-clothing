import { Link } from 'react-router-dom';
import ProductCard from "../product-card/product-card.component";

import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

const CategoryPreview = ({title, products}) => {
  return (
    <CategoryPreviewContainer key={title}>
      <Title>{<Link className="title" to={title}>{title.toUpperCase()}</Link>}</Title>
      <Preview>
      {
        products
        .filter((_, index) => index < 4)
        .map((product) => <ProductCard key={product.id} product={product} />)
      
      }
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;
  