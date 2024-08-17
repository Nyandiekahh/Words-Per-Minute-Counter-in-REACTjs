import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Header from './components/Header';
import WPMTest from './components/WPMTest';
import Footer from './components/Footer';
import Leaderboard from './components/Leaderboard';
import UserAccount from './components/UserAccount';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <UserAccount user={user} setUser={setUser} />
          <WPMTest user={user} />
          <Leaderboard />
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;