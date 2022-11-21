import React, { useState } from "react";
import { Stack, Button, TextField } from "@mui/material";
import { ContactsType, CONTACT_DEFAULTS } from "../../model/types";
import Edit from "./Edit";
import List from "./List";

function Contacts() {
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState<ContactsType>();

  const handleChangeSearchText = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(ev.target.value);

  const handleSelectItem = (item?: ContactsType) => setSelected(item);
  const handleCreateNew = () => setSelected(CONTACT_DEFAULTS);
  const closeEdit = () => setSelected(undefined);

  return (
    <div>
      {selected && <Edit item={selected} closeEdit={closeEdit} />}

      <p>
        Contacts <span className="explanation">(component)</span>
      </p>

      <Stack direction="row" spacing={2}>
        <TextField
          onChange={handleChangeSearchText}
          value={searchText}
          size="small"
          label="Search"
          placeholder="..."
        />
        <Button variant="outlined" onClick={handleCreateNew}>
          Create new
        </Button>
      </Stack>

      <List filterBy={searchText} handleSelectItem={handleSelectItem} />
    </div>
  );
}

export default Contacts;
