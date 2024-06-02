import { getClient } from "../utils";

// Get all todos for a give user
// This needs to ensure that every user comes atleast once
async function getUserAndTodosWithJoin(userId: number) {
    const client = await getClient();

    const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        LEFT JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;

    // Type of JOINs
    // INNER JOIN: Returns records that have matching values in both tables involved in the join. if there is match in one table and no match in other table, the result is not returned.
    // LEFT JOIN: Returns all records from the left table, and the matched records from the right table and if there is no match, the result is NULL from the right side.
    // RIGHT JOIN: Returns all records from the right table, and the matched records from the left table and if there is no match, the result is NULL from the left side.
    // FULL JOIN: Returns all records when there is a match in either left (table1) or right (table2) table records.
    // CROSS JOIN: Returns the Cartesian product of the two tables, i.e., the result set will be the product of the number of rows in the first table and the number of rows in the second table.
    // SELF JOIN: A self join is a regular join, but the table is joined with itself.


    const res = await client.query(joinQuery, [userId]);
    const results = res.rows;

    console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(1)