import { $8a8a8a } from '@caddijp/colors';
import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';

const StyledCaution = styled.p`
  margin: 0 auto;
  font-size: 11px;
  color: ${$8a8a8a};
`;

const Caution: FC<ComponentProps<typeof StyledCaution>> = ({ children, ...props }) => (
  <StyledCaution {...props}>
    <span role="img" aria-label="!">
      💡
    </span>
    {children}
  </StyledCaution>
);

export default Caution;
export { Caution };
