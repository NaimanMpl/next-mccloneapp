import React from 'react';
import styles from './UsersPage.module.css';

interface Address {
  city: string
}

interface User {
  id: number,
  email: string,
  name: string
  address: Address
}

const UsersPage = async () => {

  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await response.json();

  return (
    <div>
      <h1>Super texte</h1>
      <ul className='flex'>
        {
          users.map(user => 
            <div className='p-3 border border-red-500' key={user.id}>
              <p className='font-medium text-xl'>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.address.city}</p>
            </div>
          )
        }
      </ul>
    </div>
  )
}

export default UsersPage