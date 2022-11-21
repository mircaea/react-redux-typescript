import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Counter from "./components/counter/Counter";
import { useAppSelector } from "./app/hooks";
import Contacts from "./components/contacts/Contacts";

function App() {
  const counterValue = useAppSelector((state) => state.counter.value);
  const contacts = useAppSelector((state) => state.contacts.contacts);

  return (
    <>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <section className="content">
        <p>
          Counter value <span className="explanation">(app.js)</span>:{" "}
          <b>{counterValue}</b>
        </p>
        <p>
          Contacts length <span className="explanation">(app.js)</span>:{" "}
          <b>{contacts?.length}</b>
        </p>
        <br />

        <Counter />
        <br />
        <br />

        <Contacts />
      </section>
    </>
  );
}

export default App;
