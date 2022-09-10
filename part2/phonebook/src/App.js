import { useState, useEffect } from "react";
import Service from "./service";
import axios from "axios";

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input onChange={props.handleChange} />
    </div>
  );
};

const Persons = (props) => {
  return <div>{props.names}</div>;
};

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input onChange={props.handleName} />
      </div>
      <div>
        number: <input onChange={props.handleNumber} />
      </div>
      <div>
        <button onClick={props.addPerson} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="add">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [addMessage, setAddMessage] = useState(null);

  useEffect(() => {
    Service.getAll().then((initial) => {
      setPersons(initial);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: number,
    };
    Service.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    if (persons.every((person) => !(person.name === personObject.name))) {
      setPersons(persons.concat(personObject));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setAddMessage(`'${personObject.name}' has been added`);
    setTimeout(() => {
      setAddMessage(null);
    }, 5000);
  };

  const deleteperson = (id) => {
    window.confirm("do you want to delete the person");
    if (window.confirm) {
      axios.delete(`http://localhost:3001/persons/${id}`);
    }
  };

  const names = persons.map((person, i) => {
    let lower = person.name.toLowerCase();
    if (lower.includes(filter.toLowerCase())) {
      return (
        <div key={i}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteperson(person.id)}>delete</button> <br />
        </div>
      );
    }
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
      <Filter handleChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons names={names} />
    </div>
  );
};

export default App;
