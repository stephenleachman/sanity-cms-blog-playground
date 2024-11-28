import { fullBlog } from '@/app/lib/interface';
import Navbar from '@/components/Navbar'
import { client } from '@/sanity/lib/client';
import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
    "currentSlug": slug.current,
      title,
      content,
      titleImage,
    }[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function BlogArtical({
  params: asyncParams,
}: {
  params: Promise<{ slug: string }>;
}) {

  const params = await asyncParams; // Await params here
  const data: fullBlog = await getData(params.slug);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-5">
        <h1 className='mt-8'>
          <span className='block text-base text-center text-primary font-semibold tracking-wide uppercase'>Stephen Leachman - Blog</span>
          <span className='mt-2 block text-3xl text-center font-bold leading-8 tracking-tight sm:text-4xl'>{data.title}</span>
        </h1>
        <Image 
        src={urlFor(data.titleImage).url()}
        alt="title image"
        height={300}  
        width={600}
        className='mt-8 rounded-xl object-cover w-full h-[500px] border'
        priority
        />
        <div className='mb-20 max-w-3xl mt-16 prose prose-lg dark:prose-invert prose-blue prose-li:marker:text-primary'>
          <PortableText value={data.content} />
        </div>
      </div>
    </div>
  )
}
