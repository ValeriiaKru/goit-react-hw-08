import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const INITIAL_STATE = {
    contacts: {
        items: [],
        loading: false,
        error: null,
        
},
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.contacts.loading = true;
                state.contacts.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts.loading = false;
                state.contacts.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.contacts.loading = false;
                state.contacts.error = true;
            })
            .addCase(deleteContact.pending, (state) => {
                state.contacts.loading = true;
                state.contacts.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts.loading = false;
                state.contacts.items = state.contacts.items.filter(
                    (item) => item.id !== action.payload.id
                );
            })
            .addCase(deleteContact.rejected, (state) => {
                state.contacts.loading = false;
                state.contacts.error = true;
            })
            .addCase(addContact.pending, (state) => {
                state.contacts.loading = true;
                state.contacts.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.loading = false;
                state.contacts.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state) => {
                state.contacts.loading = false;
                state.contacts.error = true;
            });
    },
});

export const contactsReducer = contactsSlice.reducer; 