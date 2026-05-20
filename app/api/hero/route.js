import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM hero LIMIT 1');
    return NextResponse.json(result.rows[0] || {});
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}