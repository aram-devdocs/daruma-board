import {
  Box,
  TextField,
  Button,
  InputLabel,
} from '@daruma-board/web/design-system';

export const NewGoalForm = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white', // TODO - replace with theme
        color: 'primary.contrastText',
        height: '10vh',
        width: '10vw',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <InputLabel>Test</InputLabel>
        <TextField />
      </Box>
      <Button />
    </Box>
  );
};
