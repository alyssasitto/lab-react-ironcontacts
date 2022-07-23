import logo from "./logo.svg";
import "./App.css";
import importedContacts from "./contacts.json";
import { useState } from "react";

function App() {
	// const contacts = Contacts.slice(0, 5);
	const [contacts, setContacts] = useState(importedContacts.slice(0, 5));
	const [remainingContacts, setRemainingContacts] = useState(
		importedContacts.slice(5)
	);

	const addRandomContact = () => {
		const random = Math.floor(Math.random() * remainingContacts.length - 1);
		const contactCopy = [...contacts];
		const remainingContactsCopy = [...remainingContacts];

		const chosenContact = remainingContactsCopy.splice(random, 1);

		contactCopy.push(chosenContact[0]);
		setContacts(contactCopy);
		setRemainingContacts(remainingContactsCopy);
	};

	const sortByPopularity = () => {
		const contactsList = [...contacts];

		contactsList.sort((a, b) => {
			return b.popularity - a.popularity;
		});

		setContacts(contactsList);
	};

	const sortByName = () => {
		const contactsList = [...contacts];

		contactsList.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		setContacts(contactsList);
	};

	const removeContact = (contactId) => {
		const contactCopy = [...contacts];
		const remainingContactsCopy = [...remainingContacts];

		const contactIndex = contactCopy.findIndex((contact) => {
			return contact.id === contactId;
		});

		const removeContact = contactCopy.splice(contactIndex, 1);

		remainingContactsCopy.push(removeContact[0]);

		setContacts(contactCopy);
		setRemainingContacts(remainingContactsCopy);
	};

	return (
		<div className="App">
			<h1>IronContact</h1>
			<div className="buttons">
				<button onClick={addRandomContact}>Add Random Contact</button>
				<button onClick={sortByPopularity}>Sort by popularity</button>
				<button onClick={sortByName}>Sort by name</button>
			</div>
			<table>
				<thead className="head">
					<th>Picture</th>
					<th>Name</th>
					<th>Popularity</th>
					<th>
						Won
						<br /> Oscar
					</th>
					<th>
						Won
						<br /> Emmy
					</th>
					<th>Actions</th>
				</thead>
				<tbody>
					{contacts.map((contact) => {
						return (
							<tr className="person-row">
								<td>
									<img src={contact.pictureUrl} alt="Profile picture"></img>
								</td>
								<td className="name">{contact.name}</td>
								<td className="popularity">{contact.popularity.toFixed(1)}</td>
								{contact.wonOscar ? <td>🏆</td> : <td></td>}
								{contact.wonEmmy ? <td>🏆</td> : <td></td>}
								<button onClick={() => removeContact(contact.id)}>
									Delete
								</button>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default App;
