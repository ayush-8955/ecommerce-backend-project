import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await pool.query("SELECT * FROM ecommerce.payments");
  return NextResponse.json(result.rows);
}

export async function POST(req) {
  const { order_id, payment_method, payment_status } = await req.json();

  const result = await pool.query(
    "INSERT INTO ecommerce.payments (order_id,payment_method,payment_status) VALUES ($1,$2,$3) RETURNING *",
    [order_id, payment_method, payment_status]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
