import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from './Auth/slice';
import chat from './Chat/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth,
        chat,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
