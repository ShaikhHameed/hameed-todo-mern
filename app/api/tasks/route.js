import connectMongo from "../dbConnect";
import Task from "@/app/schema/Task";
import { NextResponse } from "next/server";

export async function GET() {
     await connectMongo();
     const tasks = await Task.find().sort("position");
    return NextResponse.json(tasks);
}

export async function POST(req) {
  await connectMongo();
  const { title, description, status, position } = await req.json();
  const task = new Task({ title, description, status, position });
  await task.save();
  return NextResponse.json(task, { status: 201 });
}

    export async function PUT(req) {
  await connectMongo();
  const { id, ...data } = await req.json();
  const task = await Task.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(task);
}

export async function DELETE(req) {
  await connectMongo();
  const { id } = await req.json();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" });
}
