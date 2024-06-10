/* 

! Bad Approch -->

-- Query 1: Fetch user's details
SELECT id, username, email
FROM users
WHERE id = YOUR_USER_ID;

-- Query 2: Fetch user's address
SELECT city, country, street, pincode
FROM addresses
WHERE user_id = YOUR_USER_ID;


! Using JOIN -->

SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
FROM users u
JOIN addresses a
ON u.id = a.user_id
WHERE u.id = YOUR_USER_ID;

*/

import { Client } from 'pg';

// Async function to fetch user details and address separately
async function getUserDetailsAndAddressSeparately(userId: string) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword',
  });

  try {
    await client.connect();

    // Fetch user details
    const userDetailsQuery = 'SELECT id, username, email FROM users WHERE id = $1';
    const userDetails = await client.query(userDetailsQuery, [userId]);

    // Fetch user address
    const userAddressQuery = 'SELECT city, country, street, pincode FROM addresses WHERE user_id = $1';
    const userAddress = await client.query(userAddressQuery, [userId]);

    if (userDetails.rows.length > 0) {
      console.log('User found:', userDetails.rows[0]);
      console.log('Address:', userAddress.rows.length > 0 ? userAddress.rows[0] : 'No address found');
      return { user: userDetails.rows[0], address: userAddress.rows.length > 0 ? userAddress.rows[0] : null };
    } else {
      console.log('No user found with the given ID.');
      return null;
    }
  } catch (err) {
    console.error('Error during fetching user and address:', err);
    throw err;
  } finally {
    await client.end();
  }
}
getUserDetailsAndAddressSeparately("1");



// Async function to fetch user data and their address together
async function getUserDetailsWithAddress(userId: string) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword',
  });

  try {
    await client.connect();
    const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
    const result = await client.query(query, [userId]);

    if (result.rows.length > 0) {
      console.log('User and address found:', result.rows[0]);
      return result.rows[0];
    } else {
      console.log('No user or address found with the given ID.');
      return null;
    }
  } catch (err) {
    console.error('Error during fetching user and address:', err);
    throw err;
  } finally {
    await client.end();
  }
}
getUserDetailsWithAddress("1");