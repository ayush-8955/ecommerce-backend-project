import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await pool.query("SELECT * FROM ecommerce.categories");
  return NextResponse.json(result.rows);
}

export async function POST(req) {
  const { category_name } = await req.json();

  const result = await pool.query(
    "INSERT INTO ecommerce.categories (category_name) VALUES ($1) RETURNING *",
    [category_name]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
