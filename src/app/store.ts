// configureStore = a wrapper that takes your reducer and creates a store - with right defaults:
// .turn on redux dev tools extension
// .adds thunk middleware
// .turns on development checks that catch common mistakes like accidental mutations
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counter-slice";
import contactsReducer from "../features/contacts/contacts-slice";

export const store = configureStore({
  // combine reducers if we pass an object => state.counter field in our state
  reducer: {
    counter: counterReducer,
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
