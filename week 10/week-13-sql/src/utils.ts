import { Client } from 'pg';

export async function getClient() {
    // Neon database URL
    const url = "postgresql://todo_db_owner:sz6ZSvuqwIL2@ep-odd-heart-a5i2of68.us-east-2.aws.neon.tech/todo_db?sslmode=require"
    const client = new Client(url);
    await client.connect();
    return client;
}