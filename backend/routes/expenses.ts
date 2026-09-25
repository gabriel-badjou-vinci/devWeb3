import { Router } from "express";
import type { Expense, NewExpense } from "../types/Expense.ts";
import { readAll, createOne, resetExpenses } from "../services/expenses.ts";
const router = Router();

router.get("/expenses", async (_req, res) => {
  try {
    const allExpenses = await readAll();
    return res.json(allExpenses);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.post("/expenses", async (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("date" in body) ||
    !("description" in body) ||
    !("payer" in body) ||
    !("amount" in body) ||
    typeof body.date !== "string" ||
    typeof body.description !== "string" ||
    typeof body.payer!== "string" ||
    typeof body.amount !== "number" ||
    body.amount <= 0 ||
    !body.date.trim() ||
    !body.description.trim() ||
    !body.payer.trim() 
  ) {
    return res.sendStatus(400);
  }

  const newExpenses: NewExpense = {
      date: body.date,
      description: body.description,
      payer: body.payer,
      amount: body.amount
  };

  try {
    await createOne(newExpenses);
    return res.json(newExpenses);
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.sendStatus(500);
    }

    if (error.message === "Not found") {
      return res.sendStatus(404);
    }

    if (error.message === "Conflict") {
      return res.sendStatus(409);
    }

    return res.sendStatus(500);
  }
});

router.post("/expenses/reset", async(_req,res) => {
  try {
    const exp = await resetExpenses();
    return res.json(exp);
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.sendStatus(500);
    }

    if (error.message === "Not found") {
      return res.sendStatus(404);
    }

    if (error.message === "Conflict") {
      return res.sendStatus(409);
    }

    return res.sendStatus(500);
  }
})

export default router;