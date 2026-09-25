import path from "node:path";
import type { Expense, NewExpense } from "../types/Expense.ts";
import fs from "fs"
import { db } from "../src/prisma/db.ts";
const jsonDbPathInit = path.join("./data/expenses.init.json");
const jsonDbPath = path.join("./data/expenses.json");

const readAll = async (): Promise<Expense[]> => {
  // const expenses = fs.readFileSync(jsonDbPath, 'utf8');
  const expenses = await db.orm.public.Expense.all();
  return expenses.map((p)=>({
    ...p,
    id:String(p.id)}
  )
  );
};

const createOne = async (expense: NewExpense): Promise<Expense> => {
  const exp = await db.orm.public.Expense.create(expense);

  // expenses.push(expense);

  // fs.writeFileSync(jsonDbPath, JSON.stringify(expenses));

  return {
    id:exp.id.toString(),
    date:exp.date,
    amount:exp.amount,
    description:exp.description,
    payer:exp.payer
  };
};

const resetExpenses = () : Expense[] => {
  const expenses : Expense[] = JSON.parse(fs.readFileSync(jsonDbPathInit,"utf8"));
  fs.writeFileSync(jsonDbPath, JSON.stringify(expenses));
  return expenses;
}

export {readAll,createOne,resetExpenses}