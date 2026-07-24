import { NextResponse } from "next/server";

import { getArtistStats } from "@/lib/artistStats";

export const revalidate = 600;

export async function GET() {
  try {
    const stats = await getArtistStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[GET /api/artist]", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Не удалось получить статистику артиста",
      },
      {
        status: 500,
      },
    );
  }
}