import pool from "@/lib/db";
import { NextResponse } from "next/server";

/* GET all products */
export async function GET() {
  const result = await pool.query(
    "SELECT p.*, c.category_name FROM ecommerce.products p JOIN ecommerce.categories c ON p.category_id=c.category_id"
  );
  return NextResponse.json(result.rows);
}

/* ADD product */
export async function POST(req) {
  const { name, price, stock, category_id } = await req.json();

  const result = await pool.query(
    "INSERT INTO ecommerce.products (name,price,stock,category_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, price, stock, category_id]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
