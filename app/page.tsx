import Navbar from "@/components/Navbar";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
    title, smallDiscription, 
    "currentSlug": slug.current,
    titleImage
  }`;
  const data = await client.fetch(query);

  return data;
};

export default async function Home() {

  const data: simpleBlogCard[] = await getData();

  // $ npm i @sanity/image-url

  return (
   <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-5">
          {data.map((post, idx) => (
            <Card key={idx}>
              <Image 
                src={urlFor(post.titleImage).url()}
                alt="title image"
                height={300}
                width={300}
                className="rounded-t-xl h-[200px] w-full object-cover"
              />
              <CardContent className="mt-5">
                <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDiscription}</p>
                <Button 
                  asChild 
                  className="w-full mt-7 rounded-full"
                  >
                  <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                  </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
   </div>
  )
}
