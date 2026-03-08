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

export async function PUT(req: Request, context: any) {
  await connectDB();

  const userId = getUserId(req);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const body = await req.json();

  const updatedBook = await Book.findOneAndUpdate(
    { _id: params.id, userId },
    body,
    { new: true }
  );

  return NextResponse.json(updatedBook);
}

export async function DELETE(req: Request, context: any) {
  await connectDB();

  const userId = getUserId(req);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;

  const deletedBook = await Book.findOneAndDelete({
    _id: params.id,
    userId,
  });

  return NextResponse.json({
    message: "Book deleted successfully",
    deletedBook,
  });
}