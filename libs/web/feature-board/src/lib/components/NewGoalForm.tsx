import {
  Box,
  TextField,
  Button,
  InputLabel,
  DatePicker,
  Select,
  MenuItem,
  IconButton,
  validateEmail,
  ArrowBack,
} from '@daruma-board/web/design-system';
import { darumas, Daruma } from '../types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const NewGoalForm = () => {
  // TODO: move to hook
  const router = useRouter();
  const textFieldSx = {
    width: '100%',
    marginTop: '1rem',
  };
  const darumasArray = Object.values(darumas);
  const localEmail = localStorage.getItem('localEmail') || '';
  const [daruma, setDaruma] = useState<Daruma>(darumasArray[0]);
  const [goal, setGoal] = useState<string>('');
  const [email, setEmail] = useState<string>(localEmail);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

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
    setValidated(true);

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

    if (!validateEmail(email)) {
      alert('Email is invalid');
      setLoading(false);
      return;
    }

    if (!dueDate) {
      alert('Due Date is required');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/goals-create', {
      method: 'POST',
      body: JSON.stringify({
        daruma: daruma.description,
        color: daruma.color,
        goal,
        email,
        dueDate,
        notes,
      }),
    });
    const data = await response.json();

    if (data.error) {
      alert('Error sending goal');
      setLoading(false);
      return;
    }

    setLoading(false);

    router.push('/board');
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white', 
        color: 'primary.contrastText',
        height: '70vh',
        width: '90vw',

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
        error={validated && !goal}
      />

      <InputLabel>Email</InputLabel>
      <TextField
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        sx={textFieldSx}
        value={email}
        type="email"
        disabled={!!localEmail}
        error={validated && !validateEmail(email)}
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
