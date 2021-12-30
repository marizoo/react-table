//! STEPS STEPS STEPS STEPS STEPS

//? 00. to Display existing data
 const [contacts, setContacts] = useState(data);

// ADD CONTACT FORM
// We need to store form values in State & update the value as the user type.
//? A.01. Use state to store the value
    const [addFormData, setAddFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
    })

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

//NExt, make 2 component, editable and read only row.
//! To toggle between ReadOnly and Editable, with EDIT BUTTON, to match it with the current ID. 
//? B.01.Add a new state Hook.
    const [editContactId, setEditContactId] = useState(null);
// next we want to add a TERNARY operator to show / hide the edit row. To determine the showing either readOnly or Editable. FOr example, if:
// const [editContactId, setEditContactId] = useState(2); then contacts with id #2 will show the editable row.

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

//! To change the state of "editContactId", we then need to add an EDIT BUTTON
//? B.02.Add EDIT BUTTON
  const handleEditClick = (ev, contact) => {
      ev.preventDefault();
      setEditContactId(contact.id);
  }

// now we add this function to the read only row:  <ReadOnlyRow onHandleEditClick={handleEditClick} />
// go to ReadOnlyRow.jsx to add "<button type="button" onClick={(ev) => onHandleEditClick(ev, contact)}>  Edit  </button>"
// with this, now id you click the edit button, it will change to the editable row.

//! we want to work on the EditableRow.jsx, so we can save and cancel the input value in here. Remember, the editableRow is essentially a form, similar to our add contact form.
  // so we will start by creating a state object to hold the form data, when we edit a given row.
//? B.03.Add the editFormData state
const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  })
//next, similar to the addFormData, we want to update the value when in input is changed. So create a function similar to "A.02. handleAddFormChange"
//? B.04.Add a function to save the user input inside each editable row.
const handleEditFormChange = (ev) => {
    ev.preventDefault();

    const fieldName = ev.target.getAttribute('name');
    const fieldValue = ev.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData); 
}

// Next, we want to display this edit version inside the "Contact list"
// we need to take the value from the contact, and add our edit form data in it. so go to > "handleEditCLick" to add this new edit form data.
//! B.02.Add EDIT BUTTON
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
    // now we can add the editFormData state + editForm function to the "<EditableRow />"
    // <EditableRow editFormData={editFormData}  onHandleEditFormChange={handleEditFormChange}/>
    // inside EditableRow.jsx, add  "<button type="submit">Save</button>"

//! to make the SAVE button work, to save the editableRow form, save the new data to displayed on the contacts.
// similar to the "add new contact funtionality, we will create a new event handler function in App.js", just beneath the handle add form SUbmit.
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

// next, you need to add this function to the form > " <form onSubmit={handleEditFormSubmit}>"

//! to finish off the APP
// need to add the "Cancel" and "Delete" button.
//? C.01. make a Cancel function to cancel editing the Form.




//- B.01.ReadOnlyRow.jsx component
//- C.01.EditableRow.jsx component

