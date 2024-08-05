import { AddChatMessageFormData } from '@/app/models/formsdata.model';

export async function POST(request: Request) {
  const data: AddChatMessageFormData = await request.json();
}
