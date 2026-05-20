import { retrieveContext } from "@/lib/rag";
import { askOpenRouter } from "@/lib/openrouter";

export async function POST(req) {
  const body = await req.json();
  const message = body.message;

  // 1. Get context from vector DB
  const context = await retrieveContext(message);

  // 2. Get AI answer
  const reply = await askOpenRouter(context, message);

  return Response.json({ reply });
}