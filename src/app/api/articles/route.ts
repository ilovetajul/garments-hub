// src/app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const role     = searchParams.get("role");

  const articles = await db.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(category ? { category: category.toUpperCase() as any } : {}),
      ...(role     ? { targetRole: { has: role.toUpperCase() as any } } : {}),
    },
    select: {
      id: true, title: true, slug: true, summary: true,
      category: true, difficulty: true, readTimeMin: true, publishedAt: true,
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ articles, count: articles.length });
}
