/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: Promise<{ id: string }>;
};

// PUT handler to update a todo
export async function PUT(
  request: NextRequest,
  context: Context
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const UPDATE_KEY = process.env.NEXT_PUBLIC_PUT_KEY;

  try {
    const params = await context.params;
    const id = params.id;
    const body = await request.json();

    const response = await fetch(
      `${API_URL}/api/todos/${id}?code=${UPDATE_KEY}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const DELETE_KEY = process.env.NEXT_PUBLIC_DELETE_KEY;

  try {
    const params = await context.params;
    const id = params.id;
    
    const response = await fetch(
      `${API_URL}/api/todos/${id}?code=${DELETE_KEY}`,
      {
        method: 'DELETE',
      }
    );
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}