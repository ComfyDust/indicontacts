import React, { useState } from 'react';

import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _set from 'lodash/set';

import { IndiContactClient } from '../client';
import { Validator } from '../types';
import { isValidEmail, isValidZip } from './validators';

// TODO: Find a better place for these to live
const usStates = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
  'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY',
];
const blankContact = {
  email: '',
  name: {
    first: '',
    last: '',
  },
  address: {
    street: '',
    city: '',
    state: usStates[0],
    zip: '',
  },
};

export function SignupForm() {
  const [formData, setFormData] = useState(_cloneDeep(blankContact));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    // Validate
    // TODO: Create abstraction for validation logic or research existing frontend validation libraries for React, Material UI
    let formHasError = false;
    const onSubmitErrors = { ...errors };
    const validate = (fieldPath: string, validationFn: Validator, helperText: string) => {
      if (!validationFn(_get(formData, fieldPath))) {
        formHasError = true;
        _set(onSubmitErrors, fieldPath, helperText);
        setErrors(onSubmitErrors);
      } else {
        _set(onSubmitErrors, fieldPath, undefined);
      }
    }

    validate('address.zip', isValidZip, 'Invalid ZIP Code');
    validate('email', isValidEmail, 'Invalid Email');

    if (formHasError) {
      return;
    }

    setErrors({});

    // Submit
    // TODO: Handle submission errors
    const client = new IndiContactClient();

    setIsSubmitting(true);
    await client.createContact(formData);

    // Handle success
    setSuccessOpen(true);
    setFormData(blankContact);
    setIsSubmitting(false);
  };

  const setField = (fieldPath: string, value: string) => {
    const data = { ...formData };
    _set(data, fieldPath, value);
    setFormData(data);
  }
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    setField(event.target.name, event.target.value);
  };

  const buildTextField = (label: string, fieldPath: string) => (
    <TextField
      name={fieldPath}
      value={_get(formData, fieldPath)}
      label={label}
      variant="outlined"
      onChange={handleChange}
      helperText={_get(errors, fieldPath)}
      error={!!_get(errors, fieldPath)}
      required
      disabled={isSubmitting}
      margin='normal'
    />
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      {buildTextField('Email', 'email')}
      <br />

      {/* Name */}
      {buildTextField('First Name', 'name.first')}
      {buildTextField('Last Name', 'name.last')}
      <br />

      {/* Address */}
      {buildTextField('Street', 'address.street')}
      {buildTextField('City', 'address.city')}

      <FormControl margin='normal'>
        <InputLabel id="address-city-label">State</InputLabel>
        <Select<string>
          labelId="address-city-label"
          label="State"
          onChange={(event) => setField('address.state', event.target.value)}
          value={formData.address.state}
          disabled={isSubmitting}
        >
          {usStates.map((state, idx) => <MenuItem key={idx} value={state}>{state}</MenuItem>)}
        </Select>
      </FormControl>

      {buildTextField('ZIP Code', 'address.zip')}
      <br />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
        Save {isSubmitting && <CircularProgress />}
      </Button>

      <Snackbar open={successOpen} message="Saved!" autoHideDuration={6000} />
    </form>
  );
}
