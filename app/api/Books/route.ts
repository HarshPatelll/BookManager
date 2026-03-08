import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

function getUserId(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    return decoded.userId;
  } catch {
    return null;
  }
}

/* GET BOOKS */
export async function GET(req: Request) {
  await connectDB();

  const userId = getUserId(req);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const books = await Book.find({ userId });

  return NextResponse.json(books);
}

/* ADD BOOK */
export async function POST(req: Request) {
  await connectDB();

  const userId = getUserId(req);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, author, tags, status } = await req.json();

  const book = await Book.create({
    title,
    author,
    tags,
    status,
    userId,
  });

  return NextResponse.json(book);
}