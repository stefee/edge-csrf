//import csrf from 'edge-csrf';
import csrf from '../index';
import { NextResponse } from 'next/server';

const csrfProtect = csrf();

export async function middleware(request) {
  const response = NextResponse.next();

  // csrf protection
  const csrfError = await csrfProtect(request, response);
  if (csrfError) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/csrf-invalid';
    return NextResponse.rewrite(url);
  }

  return response;
}
