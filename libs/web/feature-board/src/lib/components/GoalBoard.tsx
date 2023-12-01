import { Box, Typography, IconButton } from '@daruma-board/web/design-system';
import { GoalBoardCard } from './GoalBoardCard';
import { useState, useEffect, Fragment } from 'react';
import { Daruma } from '../types';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

export interface BoardCardProps {
  user_id: string;

  goal: string;
  notes?: string;
  due_date: string;
  daruma?: Daruma['color'];
  description?: Daruma['description'];
  privateBoard?: boolean;
}

export interface GoalBoardProps {
  variant: 'public' | 'private';
}

export const GoalBoard = ({ variant }: GoalBoardProps) => {
  // TODO: move to hook
  const router = useRouter();
  const [goals, setGoals] = useState<BoardCardProps[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading...');

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch(`/api/goals-${variant}`, {
        method: 'POST',
        body: JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      });
      const goals = await response.json();

      if (!goals.length) {
        setLoadingMessage('No goals yet');
      } else {
        console.log(goals);
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
        width: '90vw',
        overflow: 'scroll',
      }}
    >
      {variant === 'public' && (
        <IconButton
          sx={{
            alignSelf: 'flex-start',
          }}
          onClick={() => {
            router.push('/');
          }}
        >
          <ArrowBack />
        </IconButton>
      )}

      {!goals.length ? (
        <Typography>{loadingMessage}</Typography>
      ) : (
        goals.map((goal: BoardCardProps, index) => (
          <Fragment key={`${index}_goal_board_card`}>
            <GoalBoardCard {...goal} privateBoard={variant === 'private'} />
          </Fragment>
        ))
      )}
    </Box>
  );
};
