import { Link } from "react-router-dom";

import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const {title, imageUrl} = category;

  return (
    <DirectoryItemContainer>
      <BackgroundImage style={{
        backgroundImage: `url(${imageUrl})`
      }}> </BackgroundImage>
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>{<Link to={`shop/${title}`}>Shop Now</Link>}</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;