import React from 'react'

const ReadOnlyRow = ({contact}) => {
    return (
        <tr key={contact.id}>
            <td>{contact.fullName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow
