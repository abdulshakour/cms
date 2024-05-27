
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllArticles } from "@/utils/actions/articles/get-all-articles"
import { StopCircle, VerifiedIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function CMS() {
  const response = await getAllArticles()
  return (
    <main className="flex w-full flex-col items-start p-4 justify-between ">
      <h1 className="scroll-m-20 font-semibold tracking-tight text-3xl">
        Articles
      </h1>
      <div className="flex flex-wrap justify-start items-center  gap-3 mt-[1.5rem] mb-[5rem] w-full">
        {response?.length > 0 ? response?.map((info: any) => (
          <Link href={`/cms/preview/${info?.slug}`} key={info?.id}>
            <article
              key={info?.id}
              className="flex flex-col space-y-2 border dark:border-zinc-600 border-zinc-200 rounded-md max-w-[350px]"
            >
              <Image
                src={info?.image}
                alt={info?.image_alt}
                width={900}
                height={452}
                className="rounded-t bg-muted border-b dark:border-zinc-600 border-zinc-200 transition-colors w-full"
              />
              <div className="flex flex-col px-[1rem] pt-[0.5rem] pb-[1.5rem]">
                <div className='flex lg:flex-row w-full justify-between items-center'>
                  <h2 className="text-lg font-bold">{info?.title}</h2>
                </div>
                <p className="text-muted-foreground pt-1 text-sm">{info?.subtitle}</p>
                <div className="flex justify-between mt-2 items-center w-full">
                  <p className="text-xs text-muted-foreground">
                    {new Date(info?.created_at)?.toLocaleDateString()}
                  </p>
                  <div className="flex justify-center items-center gap-1">
                    <Badge>{info?.category?.category}</Badge>
                    {info?.published ? <VerifiedIcon /> : <StopCircle />}
                  </div>
                </div>
              </div>
            </article>
          </Link>

        ))
          :
          <main className="flex flex-col gap-2 lg:gap-2 min-h-[80vh] w-full">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no articles
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Articles will show here once you&apos;ve published articles
                </p>
                <Link href="/cms/documents">
                  <Button>My Documents</Button>
                </Link>
              </div>
            </div>
          </main>
        }
      </div>
    </main>
  )
}
