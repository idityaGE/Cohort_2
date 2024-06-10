/*
Good question to have at this point is what queries are run when the user signs up and sends both their information and their address in a single request.
Do we send two SQL queries into the database? What if one of the queries (address query for example) fails? 
This would require transactions  in SQL to ensure either both the user information and address goes in, or neither does


BEGIN; -- Start transaction

INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

COMMIT;

error--> ROLLBACK;

finally--> END;

*/


import { Client } from 'pg';

async function insertUserAndAddress(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string
) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword',
  });

  try {
    await client.connect();

    // Start transaction
    await client.query('BEGIN');

    // Insert user
    const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
    const userRes = await client.query(insertUserText, [username, email, password]);
    const userId = userRes.rows[0].id;

    // Insert address using the returned user ID
    const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
    await client.query(insertAddressText, [userId, city, country, street, pincode]);

    // Commit transaction
    await client.query('COMMIT');

    console.log('User and address inserted successfully');
  } catch (err) {
    await client.query('ROLLBACK'); // Roll back the transaction on error
    console.error('Error during transaction, rolled back.', err);
    throw err;
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
insertUserAndAddress(
  'johndoe',
  'john.doe@example.com',
  'securepassword123',
  'New York',
  'USA',
  '123 Broadway St',
  '10001'
);