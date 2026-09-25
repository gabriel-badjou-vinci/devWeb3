import path from "node:path";
import type { Expense } from "../types/Expense.ts";
import fs from "fs"
const jsonDbPathInit = path.join("./data/expenses.init.json");
const jsonDbPath = path.join("./data/expenses.json");

const readAll = (): Expense[] => {
  const expenses = fs.readFileSync(jsonDbPath, 'utf8');

  return JSON.parse(expenses);
};

const createOne = (expense: Expense): Expense => {
  const expenses : Expense[] = JSON.parse(fs.readFileSync(jsonDbPath,"utf8"));

  expenses.push(expense);

  fs.writeFileSync(jsonDbPath, JSON.stringify(expenses));

  return expense;
};

const resetExpenses = () : Expense[] => {
  const expenses : Expense[] = JSON.parse(fs.readFileSync(jsonDbPathInit,"utf8"));
  fs.writeFileSync(jsonDbPath, JSON.stringify(expenses));
  return expenses;
}

export {readAll,createOne,resetExpenses}