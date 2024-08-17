import React from 'react';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid var(--secondary-color);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
`;

const mockLeaderboard = [
  { username: 'SpeedTyper', wpm: 120, accuracy: 98 },
  { username: 'WordMaster', wpm: 115, accuracy: 97 },
  { username: 'KeyboardKing', wpm: 110, accuracy: 99 },
  { username: 'TypeRunner', wpm: 105, accuracy: 96 },
  { username: 'LetterNinja', wpm: 100, accuracy: 95 },
];

function Leaderboard() {
  return (
    <LeaderboardContainer>
      <h2>Leaderboard</h2>
      <LeaderboardTable>
        <thead>
          <tr>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>WPM</TableHeader>
            <TableHeader>Accuracy</TableHeader>
          </tr>
        </thead>
        <tbody>
          {mockLeaderboard.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.username}</TableCell>
              <TableCell>{entry.wpm}</TableCell>
              <TableCell>{entry.accuracy}%</TableCell>
            </TableRow>
          ))}
        </tbody>
      </LeaderboardTable>
    </LeaderboardContainer>
  );
}

export default Leaderboard;