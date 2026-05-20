import pool from '@/lib/db';
import { NextResponse } from 'next/server';

/* GET all certificates */
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, title, image FROM certificates ORDER BY id DESC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

/* POST new certificate */
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, image } = body;

    const result = await pool.query(
      'INSERT INTO certificates (title, image) VALUES ($1, $2) RETURNING *',
      [title, image]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add certificate' },
      { status: 500 }
    );
  }
}