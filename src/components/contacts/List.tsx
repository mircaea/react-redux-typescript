import React, { useCallback, useMemo } from "react";
import { Button } from "@mui/material";
import { ContactsType } from "../../model/types";
import classes from "./contacts.module.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { remove } from "../../features/contacts/contacts-slice";

interface ListProps {
  filterBy: string;
  handleSelectItem: (item?: ContactsType) => void;
}

function List({ filterBy, handleSelectItem }: ListProps) {
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const dispatch = useAppDispatch();

  const testText = filterBy ? filterBy.toLowerCase() : "";
  const pool = useMemo(
    () =>
      contacts && contacts.length
        ? contacts.filter(
            (item) =>
              testText === "" ||
              item.email.includes(testText) ||
              item.phone.includes(testText)
          )
        : [],
    [contacts, testText]
  );

  const handleEdit = useCallback(
    (item: ContactsType) => {
      if (!item || !item.id) return;
      handleSelectItem(item);
    },
    [handleSelectItem]
  );

  const handleDelete = (item: ContactsType) => {
    if (!item || !item.id) return;
    dispatch(remove(item));
  };

  return (
    <>
      <p>
        <span className="explanation">Contacts length</span> {contacts?.length}
        <span className="explanation">
          . Filtered (email & phone) length
        </span>{" "}
        {pool?.length}
        <span className="explanation">.</span>
      </p>
      <table className={classes.Table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>First name</td>
            <td>Last name</td>
            <td>Email</td>
            <td>Phone</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {pool &&
            pool.map((item, idx) => (
              <tr key={idx}>
                <td className={classes.CellID}>{item?.id}</td>
                <td>{item?.firstName}</td>
                <td>{item?.lastName}</td>
                <td>{item?.email}</td>
                <td>{item?.phone}</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(item)}
                    fullWidth={true}
                    size="small"
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item)}
                    fullWidth={true}
                    size="small"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default List;
