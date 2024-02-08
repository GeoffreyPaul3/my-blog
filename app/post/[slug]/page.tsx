import { Post } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { format, isValid, parseISO } from "date-fns";
import { PortableText } from "@portabletext/react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityimageUrl";

async function getData(slug: string) {
  const query = `*[_type == "post"]`;

  const data = await client.fetch(query);

  return data;
}


export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = (await getData(params.slug)) as Post;

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt=""
          className="rounded-lg"
          width={800}
          height={800}
        />
      ),
    },
  };

  // Parse the date and check if it's valid before formatting
  const parsedDate = parseISO(data._createdAt || "");
  const formattedDate = isValid(parsedDate)
    ? format(parsedDate, "yyyy-MM-dd")
    : "No Date Available";

  return (
    <>
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div>
              <p className="text-base font-medium leading-6 text-sky-500">
                {formattedDate}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {data.title}
            </h1>
          </div>
          <Separator className="my-6 bg-sky-400" />
        </div>
      </header>
      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div>
            <PortableText
              value={data.content}
              components={PortableTextComponent}
            />
          </div>
        </div>
      </div>
    </>
  );
}
