import React from 'react'

const ReadOnlyRow = ({contact, onHandleEditClick, onHandleDeleteClick}) => {
    return (
        <tr key={contact.id}>
            <td>{contact.fullName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
            <td>
                <button
                type="button"
                onClick={(ev) => onHandleEditClick(ev, contact)}
                >
                Edit
                </button>
                <button
                type="button"
                onClick={() => onHandleDeleteClick(contact.id)}
                >
                Delete
                </button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow
