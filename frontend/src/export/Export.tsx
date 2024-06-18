import React, { useState } from 'react';

import { Button, CircularProgress } from '@mui/material';

import { IndiContactClient } from '../client';

export function Export() {
  const [isExporting, setIsExporting] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setIsExporting(true);
    const client = new IndiContactClient();
    const result = await client.listContacts('csv');

    const a = document.createElement('a');
    a.download = 'contacts.csv';
    a.href = URL.createObjectURL(new Blob([result]));
    a.click();

    setIsExporting(false);
  };

  return (
    <Button onClick={handleClick} variant="contained" color="primary" disabled={isExporting}>
      Export {isExporting && <CircularProgress />}
    </Button>
  );
}
