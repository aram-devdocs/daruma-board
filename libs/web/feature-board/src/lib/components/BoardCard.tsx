import { BoardCardProps } from './Board';
import { Box, Typography } from '@daruma-board/web/design-system';

export const BoardCard = ({
  daruma,
  goal,
  notes,
  dueDate,
  email,
}: BoardCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: daruma.color,
        border: '1px solid black',
        borderRadius: '1rem',
        margin: '1rem',
        padding: '0.5rem',
      }}
    >
      <Typography>{email}</Typography>
      <Typography>{daruma.description}</Typography>

      <Typography>{goal}</Typography>
      <Typography>{notes}</Typography>
      <Typography>{new Date(dueDate).toDateString()}</Typography>
    </Box>
  );
};
