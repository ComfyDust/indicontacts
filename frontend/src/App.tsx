import React from 'react';

import { Divider } from '@mui/material';

import { SignupForm } from './signup/SignupForm';
import { Export } from './export/Export';

function App() {
  return (
    <div className="app">
      <SignupForm />
      <Divider style={{ margin: 25 }} />
      <Export />
    </div>
  );
}

export default App;
