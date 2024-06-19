import React, { useState } from 'react';

import { Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';

import { IndiContactClient } from '../client';
import { Contact, ListContactsResp } from '../types';

const listBtnId = 'list-btn';
const exportBtnId = 'export-btn';

const blankTimeRange = {
  startTime: dayjs().hour(0).minute(0).second(0).millisecond(0),
  endTime: dayjs().hour(23).minute(59).second(59).millisecond(999),
  getAll: false,
};

export function ListContacts() {
  const [formData, setFormData] = useState(_cloneDeep(blankTimeRange));
  const [isProcessing, setIsProcessing] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const setField = (fieldPath: string) => (value: Dayjs | boolean | null) => {
    const data = { ...formData };
    _set(data, fieldPath, value);
    setFormData(data);
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    setIsProcessing(true);

    // Build contact list params
    const format = event.currentTarget.id === exportBtnId ? 'csv' : 'json';
    const timeRangeParams = formData.getAll ? {} : {
      startTime: formData.startTime.toDate(),
      endTime: formData.endTime.toDate(),
    };

    // Get contact list
    const client = new IndiContactClient();
    const resp = await client.listContacts({ format, ...timeRangeParams });

    if (format === 'json') {
      setContacts((resp as ListContactsResp).result);
    } else {
      // Download CSV
      // TODO: Make file name dynamic/customizable
      const a = document.createElement('a');
      a.download = 'contacts.csv';
      a.href = URL.createObjectURL(new Blob([resp as string]));
      a.click();
    }

    setIsProcessing(false);
  };

  return (
    <>
      {/** Time Range */}
      <DateTimePicker label="Start Time" disabled={formData.getAll} onChange={setField('startTime')} />
      <DateTimePicker label="End Time" disabled={formData.getAll} onChange={setField('endTime')} />

      {/** Submission Buttons */}
      <Button id={listBtnId} onClick={handleClick} variant="contained" color="primary" disabled={isProcessing} style={{ margin: '5px' }}>
        List Contacts {isProcessing && <CircularProgress />}
      </Button>
      <Button id={exportBtnId} onClick={handleClick} variant="contained" color="primary" disabled={isProcessing}>
        Export Contacts {isProcessing && <CircularProgress />}
      </Button>

      {/** Get All Checkbox */}
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={(event) => setField('getAll')(event.target.checked)} />} label="Get All" />
      </FormGroup>
      <br />

      {/** Contacts List */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Contacts">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Street</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Zip Code</TableCell>
              <TableCell align="right">Last Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{contact.email}</TableCell>
                <TableCell align="right">{contact.name.first}</TableCell>
                <TableCell align="right">{contact.name.last}</TableCell>
                <TableCell align="right">{contact.address.street}</TableCell>
                <TableCell align="right">{contact.address.city}</TableCell>
                <TableCell align="right">{contact.address.state}</TableCell>
                <TableCell align="right">{contact.address.zip}</TableCell>
                <TableCell align="right">{contact.lastModified.toISOString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
