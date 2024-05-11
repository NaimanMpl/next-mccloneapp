import { isAuthenticated } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const user = await isAuthenticated(request, cookies());
  
  if (!user) {
    return new Response(JSON.stringify({ message: 'Vous devez être connecté' }), { status: 400 });
  }

  const filename = user.id;

  if (!request.body) {
    return new Response(JSON.stringify({ message: 'Veuillez renseigner une image' }), { status: 400 });
  } else {
    console.log(request.body);
    return new Response(JSON.stringify({ message: 'Veuillez renseigner une image' }), { status: 400 });

  }

}