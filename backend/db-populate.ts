import { db } from './src/prisma/db.ts';

async function main() {
  const expenses = await db.orm.public.Expense.createAll([{"date":"2025-01-16","description":"Example expense #1 from Alice","payer":"Alice","amount":25.5},{"date":"2025-01-15","description":"Example expense #2 from Bob","payer":"Bob","amount":35},{"date":"2025-01-15","description":"Example expense #3 from Alice","payer":"Alice","amount":2},{"date":"2026-09-25T07:54:01.628Z","description":"New expense 1790322841628","payer":"Alice","amount":63.5826176239361},{"date":"2026-09-25T07:54:03.500Z","description":"New expense 1790322843500","payer":"Bob","amount":42.06811472411953}]);
  console.log(expenses);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });