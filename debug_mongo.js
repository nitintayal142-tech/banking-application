const { MongoClient } = require('mongodb');

// URL from application.properties
const url = 'mongodb://localhost:27017';
const dbName = 'banking_system_db';

async function main() {
    const client = new MongoClient(url);

    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        console.log(`\nListing collections in ${dbName}:`);
        const collections = await db.listCollections().toArray();
        console.log(collections.map(c => c.name));

        // Check 'customers' collection
        if (collections.find(c => c.name === 'customer')) { // collection name might be singular/plural depending on @Document in Java
            console.log("\n--- Customers ---");
            const customers = await db.collection('customer').find({}).toArray(); // Try 'customer' first
            console.log(customers);
        } else if (collections.find(c => c.name === 'customers')) {
            console.log("\n--- Customers ---");
            const customers = await db.collection('customers').find({}).toArray();
            console.log(customers);
        } else {
            console.log("\nNo 'customer' or 'customers' collection found.");
        }

        // Check 'accounts' collection
        if (collections.find(c => c.name === 'account')) {
            console.log("\n--- Accounts ---");
            const accounts = await db.collection('account').find({}).toArray();
            console.log(accounts);
        } else if (collections.find(c => c.name === 'accounts')) {
            console.log("\n--- Accounts ---");
            const accounts = await db.collection('accounts').find({}).toArray();
            console.log(accounts);
        } else if (collections.find(c => c.name === 'Accounts')) {
            console.log("\n--- Accounts (Case Sensitive) ---");
            const accounts = await db.collection('Accounts').find({}).toArray();
            console.log(accounts);
        } else {
            console.log("\nNo 'account', 'accounts', or 'Accounts' collection found.");
        }

    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    } finally {
        await client.close();
    }
}

main();
