
  //01. ADD A CONTACT. 
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  })

    //  B.01.EditableRow.
    const [editFormData, setEditFormData] = useState({
      fullName: '',
      address: '',
      phoneNumber: '',
      email: '',
    })

    // A.01. ReadOnly Edit Button.
  const [editContactId, setEditContactId] = useState(null);

  //02. ADD A CONTACT, FOR EACH INPUT.
  const handleAddFormChange = (ev) => {
    ev.preventDefault();

    const fieldName = ev.target.getAttribute('name');
    const fieldValue = ev.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  }



   // B. 03. For EditableRow.
   const handleEditFormChange = (ev) => {
    ev.preventDefault();

    const fieldName = ev.target.getAttribute('name');
    const fieldValue = ev.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }


  // 03. ADD A CONTACT. 
  const handleAddFormSubmit = (ev) => {
    ev.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    } 

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    
    //how to clear the input after submit?
  }


   // B. 02. For EditableRow.
   const handleEditFormSubmit = (ev) => {
    ev.preventDefault();

    const editedContact = {
      id: editContactId,
      fullname: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    }

    const newContacts = [...contacts];
    const index = contacts.findIndex(contact => contact.id === editContactId)
    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  }



  // A. 02. ReadOnly Edit BUtton
  const handleEditClick = (ev, contact) => {
    ev.preventDefault();
    setEditContactId(contact.id);

    //for the edit button
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }
    //for the edit button
    setEditFormData(formValues);
  }

  
  // B.04. For EditableRow.
  const handleCancelClick = () => {
    setEditContactId(null);
  }



   // A. 03. ReadOnly Edit BUtton
   const handleDeleteClick = (contactId) => {
     const newContacts = [...contacts];

     const index = contacts.findIndex(contact => contact.id === contactId);

     newContacts.splice(index, 1);

     setContacts(newContacts);
   }
