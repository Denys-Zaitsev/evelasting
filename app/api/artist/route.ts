import { NextResponse } from "next/server";

import { getArtistStats } from "@/lib/artistStats";

export const revalidate = 600;

const EMERGENCY_FALLBACK_TOTAL = 1_068_987;

export async function GET() {
  try {
    const stats = await getArtistStats();

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control":
          "public, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // Keep the public endpoint reliable even if an unexpected server-side
    // error occurs. The UI already treats these values as display statistics.
    console.error("[GET /api/artist] unexpected failure", error);

    return NextResponse.json(
      {
        youtube: {
          channelId: "",
          title: "Evelasting",
          views: 0,
          subscribers: 0,
          videos: 0,
        },
        soundcloud: {
          plays: 0,
          source: "manual",
        },
        total: EMERGENCY_FALLBACK_TOTAL,
        updatedAt: new Date().toISOString(),
        degraded: true,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=3600",
        },
      },
    );
  }
}
