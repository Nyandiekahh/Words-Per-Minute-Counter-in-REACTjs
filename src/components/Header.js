import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>WPM Test</Title>
    </HeaderContainer>
  );
}

export default Header;