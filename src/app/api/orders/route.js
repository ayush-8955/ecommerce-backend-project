import pool from "@/lib/db";
import { NextResponse } from "next/server";

/* GET all orders */
export async function GET() {
  const result = await pool.query(
    "SELECT * FROM ecommerce.orders ORDER BY created_at DESC"
  );
  return NextResponse.json(result.rows);
}

/* PLACE order (TRANSACTION) */
export async function POST(req) {
  const client = await pool.connect();

  try {
    const { user_id, product_id, quantity, price } = await req.json();

    await client.query("BEGIN");

    const order = await client.query(
      "INSERT INTO ecommerce.orders (user_id,total_amount,status) VALUES ($1,$2,'placed') RETURNING order_id",
      [user_id, quantity * price]
    );

    await client.query(
      "INSERT INTO ecommerce.order_items (order_id,product_id,quantity,price) VALUES ($1,$2,$3,$4)",
      [order.rows[0].order_id, product_id, quantity, price]
    );

    await client.query("COMMIT");

    return NextResponse.json({ message: "Order placed successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    client.release();
  }
}
