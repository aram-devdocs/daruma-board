import { Box, Typography, IconButton } from '@daruma-board/web/design-system';
import { BoardCard } from './BoardCard';
import { useState, useEffect, Fragment } from 'react';
import { Daruma } from '../types';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

export interface BoardCardProps {
  email: string;
  daruma: Daruma;
  goal: string;
  notes?: string;
  dueDate: Date;
}

export const Board = () => {
  const router = useRouter();
  const [goals, setGoals] = useState<BoardCardProps[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading...');

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await localStorage.getItem('goals');
      const goals = JSON.parse(response || '[]');
      if (!goals.length) {
        setLoadingMessage('No goals yet');
      } else {
        setGoals(goals);
      }
    };

    fetchGoals();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'white', // TODO: theme
        height: '50vh',
        width: '50vw',
        overflow: 'scroll',
      }}
    >
      <IconButton
        sx={{
          alignSelf: 'flex-start',
        }}
        onClick={() => {
          router.back();
        }}
      >
        <ArrowBack />
      </IconButton>

      {!goals.length ? (
        <Typography>{loadingMessage}</Typography>
      ) : (
        goals.map((goal: BoardCardProps, index) => (
          <Fragment key={`${index}_goal_board_card`}>
            <BoardCard {...goal} />
          </Fragment>
        ))
      )}
    </Box>
  );
};
