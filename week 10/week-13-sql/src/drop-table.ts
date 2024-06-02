import { getClient } from "./utils";

async function dropTable() {
  const client = await getClient();
  const dropUserTableQuery = `
        DROP TABLE IF EXISTS todos;
    `;

  await client.query(dropUserTableQuery);
  
  console.log("Table dropped successfully!");
}

dropTable();