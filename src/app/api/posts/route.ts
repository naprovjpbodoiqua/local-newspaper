import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Article } from '@/types/post';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

function getPosts(): Article[] {
  if (!fs.existsSync(dataFilePath)) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData || '[]');
}

export async function GET() {
  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const posts = getPosts();

    const newPost: Article = {
      id: Date.now().toString(),
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...body,
      publishedAt: new Date().toISOString(),
    };

    if (newPost.isBreaking) {
      posts.forEach((p) => (p.isBreaking = false));
    }

    posts.unshift(newPost);
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}