import React from 'react';
import styled from 'styled-components';

type CautionProps = {
  className?: string;
};

const StyledCaution = styled.p`
  margin: 0 auto;
  font-size: 11px;
  color: #8a8a8a;
`;

const Caution: React.FC<CautionProps> = ({ children, className }) => {
  return (
    <StyledCaution className={className}>
      <span role="img" aria-label="!">
        💡
      </span>
      {children}
    </StyledCaution>
  );
};

export default Caution;
export { Caution };
export type { CautionProps };
