import React from 'react';

type ButtonProps = {
  text: string;
};

const Button: React.FC<ButtonProps> = ({ text }: ButtonProps) => {
  return <div>{text}</div>;
};

export default Button;
export { Button };
