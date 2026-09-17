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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const posts = getPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let posts = getPosts();
  posts = posts.filter((p) => p.id !== id);
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  return NextResponse.json({ success: true });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await request.json();
  const posts = getPosts();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  const currentPost = posts[postIndex];
  const updatedPost: Article = {
    ...currentPost,
    ...updates,
    id: currentPost.id,
    slug: updates.title
      ? updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : currentPost.slug,
  };

  if (updatedPost.isBreaking) {
    posts.forEach((post, index) => {
      if (index !== postIndex) post.isBreaking = false;
    });
  }

  posts[postIndex] = updatedPost;
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  return NextResponse.json(updatedPost);
}