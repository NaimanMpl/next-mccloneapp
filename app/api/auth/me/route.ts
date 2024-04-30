import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function GET() {
  const clientCookies = cookies();
  
  const accessToken = clientCookies.get('accessToken');

  if (!accessToken) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const user = jwt.verify(accessToken.value, process.env.JWT_SECRET_KEY);

    return new Response(JSON.stringify({message: 'Authenticated', user: user}), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), { status: 400 });
  }

}