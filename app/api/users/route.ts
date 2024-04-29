import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
    console.log(await prisma.users.findFirst());
    return new Response(JSON.stringify({ users: { name: 'Hello', email: 'world@world.com' } }))
}

export async function POST(request: Request) {
    return new Response(JSON.stringify({data: await request.json()}), {
        status: 201
    })
}