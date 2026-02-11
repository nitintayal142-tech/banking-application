const BASE_URL = 'http://127.0.0.1:8080/api/admin';

async function checkData() {
    console.log('🔍 Checking if Backend has data...');
    try {
        const response = await fetch(`${BASE_URL}/customers`);
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Backend reports ${data.length} customers.`);
            console.log('Here they are:');
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log('❌ Backend returned error:', response.status);
        }
    } catch (error) {
        console.error('❌ Network error:', error.message);
    }
}

checkData();
