import DeleteButton from '@/core/DeleteButton'
import EditButton from '@/core/EditButton'
import ReloadButton from '@/core/ReloadButton'
import { useVideos } from '@/hooks/useVideos'
import { numberStringify } from '@/utils/numberStringify'
import { Video } from '@/utils/types/_Video'
import Link from 'next/link'

interface Props {
  id: Video['id']
  url: string
  views: number
  title: string
  publishedAt: number
  rate: number
  channel_id?: number
  youtubeId: string
  category_id?: number
  subscriberCount?: number
}

export function timeStampToInputDate(timestamp: number) {
  const date = new Date(timestamp)
  const formattedDate = date.toISOString().split('T')[0]
  return formattedDate
}

export function diferenceMonths(date1: Date, date2: Date) {
  const months =
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    (date2.getMonth() - date1.getMonth())
  return months
}

export default function VideoCard({
  id,
  url,
  title,
  views,
  publishedAt,
  rate,
  youtubeId,
  category_id,
  subscriberCount,
}: Props) {
  const editVideo = useVideos().update
  const deleteVideo = useVideos().delete
  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden w-80 relative flex flex-col group">
      <EditButton
        title="Edit Video"
        data={{
          title: { initialValue: title, type: 'string' },
          youtubeVideoId: { initialValue: youtubeId, type: 'string' },
          publishedAt: {
            initialValue: timeStampToInputDate(publishedAt),
            type: 'date',
          },
          viewsAmount: { initialValue: views, type: 'number' },
          category_id: { initialValue: category_id, type: 'number' },
        }}
        onSubmit={d => editVideo(id, d)}
      />
      <DeleteButton onDelete={() => deleteVideo(id)} />
      <ReloadButton
        onReload={async () => {
          const response = await fetch(`/api/video-data?videoId=${youtubeId}`)
          const responseData = await response.json()

          editVideo(id, { ...responseData })
        }}
      />

      <div className="relative">
        <Link
          className="absolute w-full h-full group-hover:bg-slate-950/50  flex justify-center items-center"
          href={`https://www.youtube.com/watch?v=` + youtubeId}
          target="_blank"
        >
          <div className="opacity-0 group-hover:opacity-100 text-5xl">🔗</div>
        </Link>
        <img src={url} className="w-full" alt="" />
        {subscriberCount && (
          <span className="bg-green-500 absolute bottom-0 left-0">
            Subs: {numberStringify(subscriberCount)}
          </span>
        )}
        <span className="bg-red-500 absolute bottom-0 right-0">
          {numberStringify(rate)} V/D
        </span>
      </div>
      <main className="p-3 bg-blue-600 flex-1 flex flex-col justify-between">
        <h1 className="">{title}</h1>
        <footer className="flex gap-3">
          <span className="bg-blue-400">{numberStringify(views)} views</span>
          <span className="bg-blue-400">
            {new Date(publishedAt).toLocaleDateString('pt-br')}
          </span>
          <span className="bg-blue-400">
            {diferenceMonths(new Date(publishedAt), new Date())} months
          </span>
        </footer>
      </main>
    </div>
  )
}
