import React, { useState } from 'react';

import { Button, Checkbox, CircularProgress, FormControlLabel, FormGroup } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';

import { IndiContactClient } from '../client';

const blankTimeRange = {
  startTime: dayjs().hour(0).minute(0).second(0).millisecond(0),
  endTime: dayjs().hour(23).minute(59).second(59).millisecond(999),
  exportAll: false,
};

export function Export() {
  const [formData, setFormData] = useState(_cloneDeep(blankTimeRange));
  const [isExporting, setIsExporting] = useState(false);

  const setField = (fieldPath: string) => (value: Dayjs | boolean | null) => {
    const data = { ...formData };
    _set(data, fieldPath, value);
    setFormData(data);
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setIsExporting(true);

    // Build time range filter
    const timeRangeParams = formData.exportAll ? {} : {
      startTime: formData.startTime.toDate(),
      endTime: formData.endTime.toDate(),
    };

    // Get contact list
    const client = new IndiContactClient();
    const result = await client.listContacts({
      format: 'csv',
      ...timeRangeParams,
    });

    // Download CSV
    // TODO: Make file name dynamic/customizable
    const a = document.createElement('a');
    a.download = 'contacts.csv';
    a.href = URL.createObjectURL(new Blob([result]));
    a.click();

    setIsExporting(false);
  };

  return (
    <>
      {/** Time Range */}
      <DateTimePicker label="Start Time" disabled={formData.exportAll} onChange={setField('startTime')} /> -
      <DateTimePicker label="End Time" disabled={formData.exportAll} onChange={setField('endTime')} />
      <br />

      {/** Export All Checkbox */}
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={(event) => { setField('exportAll')(event.target.checked) }} />} label="Export All" />
      </FormGroup>
      <br />

      {/** Submission Button */}
      <Button onClick={handleClick} variant="contained" color="primary" disabled={isExporting}>
        Export {isExporting && <CircularProgress />}
      </Button>
    </>
  );
}
