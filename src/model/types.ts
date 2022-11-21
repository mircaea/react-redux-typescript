// Contacts

export interface ContactsType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  id?: string;
}

export const CONTACT_DEFAULTS: ContactsType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  id: "",
};
