import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT category, name, level FROM skills ORDER BY category ASC, level DESC'
    );

    const grouped = result.rows.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }

      acc[skill.category].push({
        name: skill.name,
        level: skill.level,
      });

      return acc;
    }, {});

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('Skills API Error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}