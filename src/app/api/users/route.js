import pool from "@/lib/db";
import { NextResponse } from "next/server";

/* GET all users */
export async function GET() {
  const result = await pool.query("SELECT * FROM ecommerce.users");
  return NextResponse.json(result.rows);
}

/* CREATE user */
export async function POST(req) {
  const { name, email, role } = await req.json();

  const result = await pool.query(
    "INSERT INTO ecommerce.users (name,email,role) VALUES ($1,$2,$3) RETURNING *",
    [name, email, role]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
