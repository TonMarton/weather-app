import { createReducer } from '@reduxjs/toolkit';
import { saveCapital } from './actions';

type State = {
  savedCapitals: string[];
};

export default createReducer(
  <State>{
    savedCapitals: ['Budapest'],
  },
  (builder) => {
    builder.addCase(saveCapital, (state, action) => {
      state.savedCapitals.push(action.payload);
    });
  },
);
