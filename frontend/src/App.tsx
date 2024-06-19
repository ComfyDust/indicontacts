import React from 'react';

import { Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { SignupForm } from './signup/SignupForm';
import { ListContacts } from './list-contacts/ListContacts';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SignupForm />
      <Divider style={{ margin: 25 }} />
      <ListContacts />
    </LocalizationProvider>
  );
}

export default App;
