import React, {useState} from 'react'
import './App.css'
import ReadOnlyRow from './components/ReadOnlyRow'
import data from './mock-data.json'
import {nanoid} from 'nanoid'
import EditableRow from './components/EditableRow'

const App = () => {
//? 00. to Display existing data
    const [contacts, setContacts] = useState(data);

//? A.01. Use state to store the value
    const [addFormData, setAddFormData] = useState({
      fullName: '',
      address: '',
      phoneNumber: '',
      email: '',
      })

//? B.03.Add the editFormData state
      const [editFormData, setEditFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
      })

//? B.01.Add a new state Hook.
const [editContactId, setEditContactId] = useState(null);

//? A.02. Make a function that will run when the user input.
    // to be added inside the input tag "onChange={handleAddFormChange}". 
    const handleAddFormChange = (ev) => {
      ev.preventDefault();
      // get the field value from the input
      const fieldName = ev.target.getAttribute('name');
      const fieldValue = ev.target.value;

      // make a copy of the existing add form data so we can change it without mutating the original state. The addFormData is an object, so we can het the key of the object to assign values to it by using [].
      const newFormData = {...addFormData};
      newFormData[fieldName] = fieldValue;
      // Set the new state.
      setAddFormData(newFormData)
    }

//? B.04.Add a function to save the user input inside each editable row.
    const handleEditFormChange = (ev) => {
        ev.preventDefault();

        const fieldName = ev.target.getAttribute('name');
        const fieldValue = ev.target.value;
    
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
    }
  
//? A. 03. Make a function to add to the list, when the form is submitted.
    // to be added inside the "<form onSubmit={handleAddFormSubmit}>""
    const handleAddFormSubmit = (ev) => {
      ev.preventDefault();

      // take the new data tht we have saved inside the state "AddFormData" , and save it to an object + add an ID. So also on top, "import {nanoid} from 'nanoid';"
      const newContact = {
          id: nanoid(),
          fullName: addFormData.fullName,
          address: addFormData.address,
          phoneNumber: addFormData.phoneNumber,
          email: addFormData.email,
      }

        // create a new array to avoid mutating the current state.
        const newContacts = [...contacts, newContact];
        // display the new added contact to the current state:
        setContacts(newContacts);
  }

//? B.06. make a handleEditFormSubmit.
  const handleEditFormSubmit = (ev) => {
    ev.preventDefault();

    //Create a new object based on the new data stored in the "editForm".
    //we also need to keep the id of the current row we are editing
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    }

    //create a new contact array + copy the current contacts data so we dont mutate the original state.
      const newContacts = [... contacts];

    //we need to get the index of the row we are editing
    const index = contacts.findIndex((contact) => contact.id === editContactId)

    //now that we have the index, we can edit the array in the selected row.
    newContacts[index] = editedContact;

    // after we save it, we want to display in contacts & hide the editable row.
    setContacts(newContacts);
    setEditContactId(null);
  }

  //? B.02.Add EDIT BUTTON
  const handleEditClick = (ev, contact) => {
    ev.preventDefault();
    setEditContactId(contact.id);


    //? B.05.create an object of formValues to save to the setEditFormData state.
    //create a new object called formValues. which will have the same value as the "editFormData" state object. refer to: "B.03"
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,    
    }

    setEditFormData(formValues);

}


  return (
    <div className='app-container'>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </thead>

          <tbody>
            {contacts.map(contact => (
            <>
              {editContactId === contact.id
                ? <EditableRow 
                    editFormData={editFormData}
                    onHandleEditFormChange={handleEditFormChange}
                    onHandleCancelClick={handleCancelClick}
                  />
                : <ReadOnlyRow 
                    contact={contact}
                    onHandleEditClick={handleEditClick}
                    onHandleDeleteClick={handleDeleteClick}
                  />
              }
            </>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="fullName" required placeholder="Enter name ..." onChange={handleAddFormChange} />
        <input type="text" name="address" required placeholder="Enter address ..." onChange={handleAddFormChange} />
        <input type="text" name="phoneNumber" required placeholder="Enter phone number ..." onChange={handleAddFormChange} />
        <input type="email" name="email" required placeholder="Enter email ..." onChange={handleAddFormChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App
