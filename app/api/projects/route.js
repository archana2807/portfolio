import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY id ASC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}