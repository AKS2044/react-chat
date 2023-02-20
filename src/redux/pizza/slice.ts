import { createSlice } from '@reduxjs/toolkit';
import { PizzaSliceState } from './types';

const initialState: PizzaSliceState = {
    pizza: [],
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
    },
});

export const {  } =
pizzaSlice.actions;

export default pizzaSlice.reducer;