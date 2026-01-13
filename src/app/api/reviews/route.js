import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await pool.query(
    "SELECT r.*, u.name FROM ecommerce.reviews r JOIN ecommerce.users u ON r.user_id=u.user_id"
  );
  return NextResponse.json(result.rows);
}

export async function POST(req) {
  const { user_id, product_id, rating, comment } = await req.json();

  const result = await pool.query(
    "INSERT INTO ecommerce.reviews (user_id,product_id,rating,comment) VALUES ($1,$2,$3,$4) RETURNING *",
    [user_id, product_id, rating, comment]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
