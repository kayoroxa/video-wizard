import { numberStringify } from '@/utils/numberStringify'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  url: string
  views: number
  title: string
  publishedAt: number
  rate: number
  channel_id?: number
  youtubeId: string
}

export default function VideoCard({
  url,
  title,
  views,
  publishedAt,
  rate,
  youtubeId,
}: Props) {
  const router = useRouter()

  return (
    <Link
      className="shadow-2xl rounded-2xl overflow-hidden w-80 "
      href={`https://www.youtube.com/watch?v=` + youtubeId}
      target="_blank"
    >
      <div className="relative">
        <img src={url} className="w-full" alt="" />
        <span className="bg-red-500 absolute bottom-0 right-0">
          {numberStringify(rate)} V/D
        </span>
      </div>
      <main className="p-3 bg-blue-600 h-full">
        <h1 className="">{title}</h1>
        <footer className="flex gap-3">
          <span className="bg-blue-400">{numberStringify(views)} views</span>
          <span className="bg-blue-400">
            {new Date(publishedAt).toLocaleDateString('pt-br')}
          </span>
        </footer>
      </main>
    </Link>
  )
}
