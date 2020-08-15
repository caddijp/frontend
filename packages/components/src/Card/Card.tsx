import React from 'react';
import styled from 'styled-components';

type CardProps = {
  padding?: string;
  width?: string;
  className?: string;
};

const Wrapper = styled.div<CardProps>`
  margin: 0 auto;
  background: #fff;
  padding: ${(props) => props.padding ?? '30px'};
  width: ${(props) => props.width ?? '550px'};
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
