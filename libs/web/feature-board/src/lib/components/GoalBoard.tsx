import {
  Box,
  Typography,
  IconButton,
  ArrowBack,
} from '@daruma-board/web/design-system';
import { GoalBoardCard } from './GoalBoardCard';
import { Fragment } from 'react';
import { Daruma } from '../types';
import { useGoalBoard } from '../hooks';


// TODO - Move to shared types
export interface BoardCardProps {
  user_id: string;
  goal: string;
  notes?: string;
  due_date: string;
  daruma: Daruma['color'];
  description: Daruma['description'];
  privateBoard?: boolean;
  goal_id: string;
}

export interface GoalBoardProps {
  variant: 'public' | 'private';
}

export const GoalBoard = ({ variant }: GoalBoardProps) => {
  const { goals, loadingMessage, navigateToIndex } = useGoalBoard({ variant });
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
          onClick={navigateToIndex}
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
