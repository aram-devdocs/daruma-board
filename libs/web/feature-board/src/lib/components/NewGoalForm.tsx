import {
  Box,
  TextField,
  Button,
  InputLabel,
  DatePicker,
  Select,
  MenuItem,
  IconButton,
} from '@daruma-board/web/design-system';
import { ArrowBack } from '@mui/icons-material';
import { darumas, Daruma } from '../types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const NewGoalForm = () => {
  const router = useRouter();
  const textFieldSx = {
    width: '100%',
    marginTop: '1rem',
  };
  const darumasArray = Object.values(darumas);

  const [daruma, setDaruma] = useState<Daruma>(darumasArray[0]);
  const [goal, setGoal] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeDaruma = (color: string) => {
    const selectedDaruma = darumasArray.find(
      (daruma) => daruma.color === color
    );
    if (selectedDaruma) {
      setDaruma(selectedDaruma);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);

    // Validate
    if (!goal) {
      alert('Goal is required');
      setLoading(false);
      return;
    }

    if (!email) {
      alert('Email is required');
      setLoading(false);
      return;
    }

    if (!dueDate) {
      alert('Due Date is required');
      setLoading(false);
      return;
    }

    // TODO - submit to API
    const response = await fetch('/api/send-goal', {
      method: 'POST',
      body: JSON.stringify({
        daruma: daruma.description,
        goal,
        email,
        dueDate,
        notes,
      }),
    });
    const data = await response.json();

    console.log(data);

    if (data.error) {
      alert('Error sending goal');
      setLoading(false);
      return;
    }
    // TODO - Remove local storage

    const existingGoals = await localStorage.getItem('goals');
    const goals = existingGoals ? JSON.parse(existingGoals) : [];
    const newGoal = {
      daruma,
      goal,
      email,
      dueDate,
      notes,
    };
    goals.push(newGoal);
    await localStorage.setItem('goals', JSON.stringify(goals));
    setLoading(false);

    router.push('/board');
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white', // TODO - replace with theme
        color: 'primary.contrastText',
        height: '70vh',
        width: '50vw',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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

      <InputLabel>Daruma</InputLabel>
      <Select
        sx={textFieldSx}
        value={daruma.color}
        onChange={(event) => {
          handleChangeDaruma(event.target.value as string);
        }}
      >
        {darumasArray.map((daruma) => (
          <MenuItem key={daruma.color + 'daruma'} value={daruma.color}>
            {daruma.color} - {daruma.description}
          </MenuItem>
        ))}
      </Select>

      <InputLabel>Goal</InputLabel>
      <TextField
        onChange={(event) => {
          setGoal(event.target.value);
        }}
        value={goal}
        sx={textFieldSx}
      />

      <InputLabel>Email</InputLabel>
      <TextField
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        sx={textFieldSx}
        value={email}
        type="email"
      />

      <InputLabel>Due Date</InputLabel>
      <DatePicker
        value={dayjs(dueDate)}
        onChange={(value) => {
          setDueDate(value?.toDate() || new Date());
        }}
        minDate={dayjs(new Date())}
      />
      <InputLabel>Notes</InputLabel>
      <TextField
        sx={textFieldSx}
        multiline
        onChange={(event) => {
          setNotes(event.target.value);
        }}
        value={notes}
      />

      <Button
        sx={{
          marginTop: '1rem',
        }}
        variant="contained"
        onClick={handleSubmit}
      >
        {loading ? 'Loading...' : 'Submit'}
      </Button>
    </Box>
  );
};
