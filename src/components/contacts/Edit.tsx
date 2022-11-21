import React, { useState, useEffect } from "react";
import { ContactsType } from "../../model/types";
import { Stack, Button, TextField } from "@mui/material";
import classes from "./contacts.module.css";
import { useAppDispatch } from "../../app/hooks";
import { addNew, edit } from "../../features/contacts/contacts-slice";

interface EditProps {
  item: ContactsType;
  closeEdit: () => void;
}

// phone format: 333-333-4444
const EXP_US_PHONE = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}\b/;
const EXP_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Edit({ item, closeEdit }: EditProps) {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleChangeFN = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(ev.target.value);
  const handleChangeLN = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(ev.target.value);
  const handleChangeEM = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
    setEmailError("");
  };
  const handleChangePH = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(ev.target.value);
    setPhoneError("");
  };

  useEffect(() => {
    if (!item) return;
    setFirstName(item?.firstName);
    setLastName(item?.lastName);
    setEmail(item?.email);
    setPhone(item?.phone);
  }, [item]);

  const handleSave = () => {
    const handleValidateForm = () => {
      let pass = true;

      if (!email || email === "" || !email.match(EXP_EMAIL)) {
        pass = false;
        setEmailError("Check email");
      }
      if (!phone || phone === "" || !phone.match(EXP_US_PHONE)) {
        pass = false;
        setPhoneError("Check phone number");
      }

      return pass;
    };

    if (!handleValidateForm()) return;

    if (item?.id) {
      dispatch(edit({ id: item.id, firstName, lastName, email, phone }));
    } else {
      dispatch(addNew({ firstName, lastName, email, phone }));
    }

    closeEdit();
  };

  return (
    <div className={classes.EditOuter}>
      <div className={classes.EditInner}>
        <p>{item?.id ? "Edit contact" : "Create new contact"}</p>
        <Stack spacing={3}>
          <TextField
            value={firstName}
            label="First name"
            placeholder="..."
            onChange={handleChangeFN}
            size="small"
          />
          <TextField
            value={lastName}
            label="Last name"
            placeholder="..."
            onChange={handleChangeLN}
            size="small"
          />
          <TextField
            value={email}
            label="Email"
            placeholder="email@address.com"
            onChange={handleChangeEM}
            size="small"
            required
            error={emailError ? true : false}
            helperText={emailError}
          />
          <TextField
            value={phone}
            label="Phone number"
            placeholder="333-333-4444"
            onChange={handleChangePH}
            size="small"
            required
            error={phoneError ? true : false}
            helperText={phoneError}
            autoComplete="phone"
            type="phone"
          />
        </Stack>
        <br />

        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={closeEdit}>
            Cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Edit;
