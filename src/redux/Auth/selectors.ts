import { RootState } from "../store";

export const selectLoginData = (state: RootState) => state.auth;

export const selectIsAuth = (state: RootState) =>
  Boolean(state.auth.data.token);
