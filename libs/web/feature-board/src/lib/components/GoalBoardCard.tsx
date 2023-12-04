import { BoardCardProps } from './GoalBoard'; // TODO - Get from data access layer
import { Box, Typography } from '@daruma-board/web/design-system';
import { useRouter } from 'next/router';

export const GoalBoardCard = ({
  daruma,
  goal,
  notes,
  due_date,
  user_id,
  description,
  privateBoard,
  goal_id,
}: BoardCardProps) => {
  const router = useRouter();

  const navigateToDetails = () => {
    router.push(`/goal/${goal_id}`);
  };
  return (
    <Box
      onClick={navigateToDetails}
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
