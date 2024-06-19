import React from 'react';

import { Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { SignupForm } from './signup/SignupForm';
import { Export } from './export/Export';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SignupForm />
      <Divider style={{ margin: 25 }} />
      <Export />
    </LocalizationProvider>
  );
}

export default App;
