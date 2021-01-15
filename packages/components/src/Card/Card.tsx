import { white } from '@caddijp/colors';
import styled from 'styled-components';

export type CardProps = {
  padding?: string;
  width?: string;
};

export const Card = styled.div<CardProps>`
  width: ${(props) => props.width ?? '550px'};
  padding: ${(props) => props.padding ?? '30px'};
  margin: 0 auto;
  background: ${white};
`;

export default Card;
