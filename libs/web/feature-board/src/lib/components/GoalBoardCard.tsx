import { BoardCardProps } from './GoalBoard';
import { Box, Typography } from '@daruma-board/web/design-system';

export const GoalBoardCard = ({
  daruma,
  goal,
  notes,
  due_date,
  user_id,
  description,
  privateBoard,
}: BoardCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: daruma,
        border: '1px solid black',
        borderRadius: '1rem',
        margin: '1rem',
        padding: '0.5rem',
      }}
    >
      <Typography>{description}</Typography>
      <Typography>Notes: {notes}</Typography>
      <Typography>Goal Date: {new Date(due_date).toDateString()}</Typography>
      {!privateBoard && <Typography>userId: {user_id}</Typography>}
    </Box>
  );
};
