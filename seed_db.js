const BASE_URL = 'http://localhost:8080/api/admin';

async function seedDatabase() {
    console.log('🌱 Starting Database Seed...');

    // Generate random suffix to avoid "Duplicate ID" errors
    const randomId = Math.floor(Math.random() * 10000);
    const newCustomerId = `admin_${randomId}`;

    console.log(`Using new unique Customer ID: ${newCustomerId}`);

    // 1. Create a Customer
    const customerData = {
        customerId: newCustomerId,
        firstName: "Admin",
        lastName: "User",
        email: `admin${randomId}@finedge.com`,
        phone: "1234567890",
        address: "123 Admin St"
    };

    try {
        console.log('Creating Customer...');
        const response = await fetch(`${BASE_URL}/customer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        });

        if (response.ok) {
            console.log('✅ Customer created successfully!');
        } else {
            const text = await response.text();
            console.error(`❌ Error creating customer: ${response.status} ${text}`);
            // If customer failed, we probably can't create account linked to it.
            return;
        }
    } catch (error) {
        console.error('❌ Network Error creating customer:', error.message);
        return;
    }

    // 2. Create the Account
    // Using same customerId so they link together
    const accountData = {
        accountid: `acc_${newCustomerId}`,
        customerId: newCustomerId,
        password: 'admin',
        balance: 10000.0,
        accountType: 'Savings',
        status: 'Active'
    };

    try {
        console.log('Creating Admin Account...');
        const response = await fetch(`${BASE_URL}/createAccount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(accountData)
        });

        if (response.ok) {
            console.log('✅ Admin Account created successfully!');
            console.log('\n🎉 SUCCESS! Database initiated automatically.');
            console.log('You can now log in with:');
            console.log('-----------------------------------');
            // Crucial: The login requires the CUSTOMER ID, not the email.
            console.log(`User (Email Field): ${newCustomerId}`);
            console.log(`Password:           admin`);
            console.log('-----------------------------------');
        } else {
            const text = await response.text();
            console.error(`❌ Error creating account: ${response.status} ${text}`);
        }
    } catch (error) {
        console.error('❌ Network Error creating account:', error.message);
    }
}

seedDatabase();
