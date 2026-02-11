const BASE = 'http://localhost:8080/customer';

async function testTransaction() {
  console.log('💰 Starting Transaction Test...');

  // 1. Get Accounts
  let accounts = [];
  try {
    const res = await fetch('http://localhost:8080/api/admin/accounts');
    if (!res.ok) throw new Error(`Failed to fetch accounts: ${res.status}`);
    accounts = await res.json();
  } catch (e) {
    console.error('❌ Cannot fetch accounts:', e.message);
    return;
  }

  if (accounts.length < 2) {
    console.error('❌ Need at least 2 accounts to test transfer. You only have ' + accounts.length);
    console.log('Account 1:', accounts[0] || 'None');
    return;
  }

  // Pick sender (with money) and recipient
  // We seeded one with money, finding it
  const richAccount = accounts.find(a => a.balance > 0) || accounts[0];
  const recipient = accounts.find(a => a.id !== richAccount.id) || accounts[1];

  console.log(`\n📤 Sender:    ${richAccount.customerId} (Balance: ${richAccount.balance})`);
  console.log(`📥 Recipient: ${recipient.customerId} (Balance: ${recipient.balance})`);

  const payload = {
    recipientCustomerId: recipient.customerId,
    amount: 10.0,
    transactionType: "Debit",
    transactionDate: new Date().toISOString(),
    description: "Test Transfer Script"
  };

  console.log('\n🚀 Sending Request to:', `${BASE}/${richAccount.customerId}/transaction`);
  try {
    const res = await fetch(`${BASE}/${richAccount.customerId}/transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log('Status Code:', res.status);
    const text = await res.text();
    console.log('Response Body:', text);

    if (res.ok) {
      console.log('✅ Transaction Successful!');
    } else {
      console.error('❌ Transaction Failed');
    }
  } catch (e) {
    console.error('❌ Network Error:', e.message);
  }
}

testTransaction();
