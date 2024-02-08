import { Separator } from "@/components/ui/separator";
import { Post } from "./lib/interface";
import { client } from "./lib/sanity";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getData() {
  const query = `*[_type == "post"]`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data = (await getData()) as Post[];
  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
          All Posts
        </h1>
      </div>
      <Separator className="my-4 bg-sky-400" />
      <ul>
        {data.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div>
                <Badge className="text-base font-medium leading-6 text-gray-100 bg-slate-900 dark:bg-sky-600">
                  {new Date(post._createdAt).toISOString().split("T")[0]}
                </Badge>
              </div>
              <Link
                href={`/post/${post.slug.current}`}
                prefetch
                className="space-y-3 xl:col-span-2"
              >
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold leading-8 tracking-tight">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-2">
                        {post.overview}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
