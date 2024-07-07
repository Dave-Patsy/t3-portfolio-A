import { getBlog } from '@/sanity/querys/blogQuery'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  const blogPosts = await getBlog()

  return (
    <div className='pt-16 w-11/12 mx-auto'>
      <h1 className='text-3xl text-center tracking-tighter'>Blog</h1>
      <div className="mx-auto mt-16 grid w-full lg:w-9/12 grid-cols-1 gap-4 divide-solid divide-y">
        {blogPosts.map((post) => (
          <Link
            href={`/blog/${post.currentSluge}`}
            key={post.currentSluge}
            className="rounded-md duration-150 hover:bg-secondary"
          >
            <h1 className="text-xl font-medium tracking-tight">{post.title}</h1>
            <p>{post.smallDescription}</p>
            <time className='text-muted-foreground font-light'>{new Date(post.publishedAt).toDateString()}</time>
          </Link>
        ))}
      </div>
    </div>
  );
}
