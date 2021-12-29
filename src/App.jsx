import React, {useState} from 'react'
import './App.css'
import ReadOnlyRow from './components/ReadOnlyRow'
import data from './mock-data.json'

const App = () => {
  const [contacts, setContacts] = useState(data)

  return (
    <div className='app-container'>
      <form>
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
              <ReadOnlyRow contact={contact}/>
            ))}
          </tbody>

        </table>
      </form>
    </div>
  )
}

export default App
