import VideoCard from '@/components/VideoCard'
import CreateButton from '@/core/CreateButton'
import { useCategories } from '@/hooks/useCategories'
import { useVideos } from '@/hooks/useVideos'
import getRate from '@/utils/sortVideo'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: categories } = useCategories().get()
  const createCategory = useCategories().create
  const createVideo = useVideos().create
  const [categoryIdSelected, setCategoryIdSelected] = useState(1)

  const { data: videos, isSuccess } = useVideos().get({
    params: { category_id: categoryIdSelected },
  })

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <div>{JSON.stringify(videos)}</div> */}

      <main className="p-4 flex gap-5 flex-col">
        <section className="bg-zinc-500/50 flex gap-4">
          <CreateButton
            title="Create Category"
            data={{
              name: { type: 'string' },
            }}
            onSubmit={createCategory}
          />
          {categories?.map(category => {
            return (
              <button
                key={category.id}
                style={{
                  opacity: categoryIdSelected === category.id ? 1 : 0.5,
                }}
                onClick={() => setCategoryIdSelected(category.id)}
                className="text-2xl capitalize bg-blue-500 p-2 rounded-lg"
              >
                {category.id}: {category.name}
              </button>
            )
          })}
        </section>
        <div className="flex gap-4 bg-zinc-500/40 mt-5">
          <CreateButton
            title="Create Video"
            data={{
              title: { type: 'string' },
              youtubeVideoId: { type: 'string' },
              publishedAt: { type: 'date' },
              viewsAmount: { type: 'number' },
              category_id: { initialValue: categoryIdSelected, type: 'number' },
            }}
            onSubmit={data => {
              const dataTimeStamp = new Date(data.publishedAt).getTime()
              createVideo({ ...data, publishedAt: dataTimeStamp })
            }}
          />
          {isSuccess &&
            videos
              .sort((a, b) => getRate(b) - getRate(a))
              .map(video => (
                <VideoCard
                  id={video.id}
                  key={video.id}
                  url={
                    video.thumbnailUrl ||
                    `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`
                  }
                  title={video.title}
                  rate={getRate(video)}
                  publishedAt={video.publishedAt}
                  views={video.viewsAmount}
                  youtubeId={video.youtubeVideoId}
                  category_id={video.category_id}
                />
              ))}
        </div>
      </main>
    </div>
  )
}
