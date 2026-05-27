import { NextResponse } from 'next/server';

export async function POST() {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

  if (!hookUrl) {
    // Em dev local não há hook — retorna ok silenciosamente
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    await fetch(hookUrl, { method: 'POST' });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
