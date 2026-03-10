// src/app/api/glossary/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q    = searchParams.get("q");
  const type = searchParams.get("type");

  const terms = await db.glossaryTerm.findMany({
    where: {
      status: "PUBLISHED",
      ...(type ? { termType: type.toUpperCase() as any } : {}),
      ...(q ? {
        OR: [
          { termEn: { contains: q, mode: "insensitive" } },
          { termBn: { contains: q } },
          { shortDefEn: { contains: q, mode: "insensitive" } },
        ],
      } : {}),
    },
    select: { id: true, termEn: true, termBn: true, slug: true, termType: true, shortDefEn: true },
    orderBy: { termEn: "asc" },
    take: 100,
  });

  return NextResponse.json({ terms, count: terms.length });
}
