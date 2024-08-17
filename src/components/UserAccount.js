import React, { useState } from 'react';
import styled from 'styled-components';

const AccountContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--secondary-color);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

function UserAccount({ user, setUser }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      setUser({ username });
      setUsername('');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AccountContainer>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}
    </AccountContainer>
  );
}

export default UserAccount;