import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // ✅ FIXED TABLE NAME
    const about = await pool.query(
      'SELECT summary FROM about LIMIT 1'
    );

    const education = await pool.query(
      'SELECT * FROM education ORDER BY id ASC'
    );

    const experience = await pool.query(
      'SELECT * FROM experience ORDER BY id ASC'
    );

    return NextResponse.json({
      about: about.rows[0] || {},
      education: education.rows || [],
      experience: experience.rows || [],
    });

  } catch (error) {
    console.error('PROFILE API ERROR:', error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}