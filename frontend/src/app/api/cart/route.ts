import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'http://127.0.0.1:5000/api/v1';

// Get cart items
export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Cart API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart', cart: [] },
      { status: 500 }
    );
  }
}

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Add to Cart API Error:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart', cart: null },
      { status: 500 }
    );
  }
}

// Update cart item
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BASE_URL}/cart/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Update Cart API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update cart', cart: null },
      { status: 500 }
    );
  }
}

// Delete cart item or clear cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    let url = `${BASE_URL}/cart/`;
    let body;
    
    if (action === 'clear') {
      url += 'clear';
    } else {
      url += 'remove';
      body = await request.json();
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to ${action === 'clear' ? 'clear cart' : 'remove item'}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Delete Cart API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process delete request', cart: null },
      { status: 500 }
    );
  }
}
