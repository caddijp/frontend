import React from 'react';
import styled from 'styled-components';

type CardProps = {
  padding?: string;
  width?: string;
  className?: string;
};

const Wrapper = styled.div<CardProps>`
  width: ${(props) => props.width ?? '550px'};
  padding: ${(props) => props.padding ?? '30px'};
  margin: 0 auto;
  background: #fff;
`;

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <Wrapper className={className} {...rest}>
      {children}
    </Wrapper>
  );
};

export default Card;
export { Card };
export type { CardProps };
