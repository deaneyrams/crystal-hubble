import { NextResponse } from 'next/server';

export function middleware(request) {
  // Define allowed origins
  const allowedOrigins = [
    'https://www.syntry.co',
    'https://syntry.co',
    // Add local development origins if needed
    'http://localhost:3000',
    'http://localhost:3001',
  ];

  const origin = request.headers.get('origin');
  const response = NextResponse.next();

  // If the origin is in our allowed list, set the Access-Control-Allow-Origin header
  if (allowedOrigins.includes(origin) || !origin) {
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204,
      headers: response.headers 
    });
  }

  return response;
}

// Match all API routes
export const config = {
  matcher: '/api/:path*',
};
