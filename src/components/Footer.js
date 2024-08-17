import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  color: var(--secondary-color);
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2024 WPM Test App. All rights reserved. 
        Powered by <a href="https://github.com/Nyandiekahh" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary-color)' }}>Nyandieka</a>
      </p>
    </FooterContainer>
  );
}

export default Footer;
