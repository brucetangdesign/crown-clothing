import { styled } from 'styled-components';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px 20px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 570px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const CategoryTitle = styled.h1`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`