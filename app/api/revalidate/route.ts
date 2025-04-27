import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from the request
    const requestHeaders = new Headers(request.headers);
    const token = requestHeaders.get('x-revalidate-token');
    
    // Verify the token
    const expectedToken = process.env.REVALIDATE_TOKEN;
    if (!expectedToken || token !== expectedToken) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get the data from the request
    const { path, tag } = await request.json();

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        message: `Path ${path} revalidated`,
      });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        message: `Tag ${tag} revalidated`,
      });
    }

    return NextResponse.json(
      { success: false, message: 'No path or tag specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { success: false, message: 'Error revalidating' },
      { status: 500 }
    );
  }
}

// Enhanced GET handler that supports URL parameters for revalidation
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const tag = searchParams.get('tag');
  
  // If no parameters, just return a helpful message
  if (!secret && !path && !tag) {
    return NextResponse.json({
      message: 'Revalidation endpoint is working. Add ?secret=YOUR_TOKEN&path=/your-path to revalidate.',
    });
  }
  
  // Verify the token
  const expectedToken = process.env.REVALIDATE_TOKEN;
  if (!expectedToken || secret !== expectedToken) {
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    );
  }

  try {
    // Handle path revalidation
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        message: `Path ${path} revalidated`,
      });
    }
    
    // Handle tag revalidation
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        message: `Tag ${tag} revalidated`,
      });
    }
    
    // No path or tag
    return NextResponse.json(
      { success: false, message: 'No path or tag specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { success: false, message: 'Error revalidating' },
      { status: 500 }
    );
  }
} 