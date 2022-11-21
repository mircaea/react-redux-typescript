import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { ContactsType } from "../../model/types";

interface ContactsState {
  contacts: ContactsType[];
}

const initialState: ContactsState = {
  contacts: [
    {
      id: uuid(),
      firstName: "First name",
      lastName: "Last name",
      email: "email@address.com",
      phone: "111-333-4444",
    },
  ],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addNew(state, action: PayloadAction<ContactsType>) {
      state.contacts.push({ ...action.payload, id: uuid() });
    },
    edit(state, action: PayloadAction<ContactsType>) {
      if (!action?.payload?.id) return;
      state.contacts = state.contacts.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else return item;
      });
    },
    remove(state, action: PayloadAction<ContactsType>) {
      if (!action?.payload?.id) return;
      state.contacts = state.contacts.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addNew, edit, remove } = contactsSlice.actions;
export default contactsSlice.reducer;
