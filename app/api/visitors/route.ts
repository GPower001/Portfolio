import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { pageVisited, referrer } = await req.json();
    
    const visitor = await prisma.visitor.create({
      data: {
        pageVisited,
        referrer: referrer || null,
      },
    });
    
    return NextResponse.json(visitor);
  } catch (error) {
    console.error('Failed to log visitor:', error);
    return NextResponse.json(
      { error: 'Failed to log visitor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const visitors = await prisma.visitor.findMany({
      orderBy: {
        visitTime: 'desc',
      },
    });
    
    return NextResponse.json(visitors);
  } catch (error) {
    console.error('Failed to fetch visitors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}