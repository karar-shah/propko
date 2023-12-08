export const data = [];

for (let i = 0; i < 100; i++) {
  const randomId = generateRandomId();
  const randomAmount = generateRandomAmount();
  const randomStatus = generateRandomStatus();
  const randomEmail = generateRandomEmail();

  const newObj = {
    id: randomId,
    amount: randomAmount,
    status: randomStatus,
    email: randomEmail,
  };

  data.push(newObj);
}

function generateRandomId() {
  return Math.random().toString(36).substr(2, 8);
}

function generateRandomAmount() {
  return Math.floor(Math.random() * 1000) + 1;
}

function generateRandomStatus() {
  const statuses = ["pending", "completed", "cancelled"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substr(2, 5);
  return `${randomString}@example.com`;
}
