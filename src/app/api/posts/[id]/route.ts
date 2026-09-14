import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Article } from '@/types/post';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

function getPosts(): Article[] {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData || '[]');
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const posts = getPosts();
  const post = posts.find((p) => p.id === params.id);
  if (!post) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let posts = getPosts();
  posts = posts.filter((p) => p.id !== params.id);
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  return NextResponse.json({ success: true });
}