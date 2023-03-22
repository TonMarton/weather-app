import { createAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const saveCapital = createAction<string>('saveCapital');
