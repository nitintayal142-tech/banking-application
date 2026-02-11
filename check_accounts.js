const BASE_URL = 'http://localhost:8080/api/admin';

async function checkAccounts() {
    console.log('🔍 Checking Accounts in Database...');
    try {
        const response = await fetch(`${BASE_URL}/accounts`);
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Backend reports ${data.length} accounts.`);
            console.log('Here they are:');
            // Only print essential fields to check generic connectivity
            const simplified = data.map(a => ({
                id: a.id,
                accountId: a.accountid || a.accountId, // Check casing
                customerId: a.customerId,
                status: a.status,
                balance: a.balance,
                hasPassword: !!a.password
            }));
            console.log(JSON.stringify(simplified, null, 2));
        } else {
            console.log('❌ Backend returned error:', response.status);
        }
    } catch (error) {
        console.error('❌ Network error:', error.message);
    }
}

checkAccounts();
