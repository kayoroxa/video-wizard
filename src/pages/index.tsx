import VideoCard from '@/components/VideoCard'
import { useCategories } from '@/hooks/useCategories'
import { useVideos } from '@/hooks/useVideos'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: categories } = useCategories().get()

  const [categoryIdSelected, setCategoryIdSelected] = useState(1)

  const { data: videos, isSuccess } = useVideos().get({
    params: { category_id: categoryIdSelected },
  })

  function modifyNumber<T>(views: number): string {
    const numero = views
    const numeroFormatado = numero
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return numeroFormatado
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <div>{JSON.stringify(videos)}</div> */}
      <main className="p-4 flex gap-5 flex-col">
        <section className="bg-zinc-500/50 flex gap-4">
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
                {category.name}
              </button>
            )
          })}
        </section>
        <div className="flex gap-4 bg-zinc-500/40 mt-5">
          {isSuccess &&
            videos.map(video => (
              <VideoCard
                key={video.id}
                url={
                  video.url ||
                  `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`
                }
                title={video.title}
                rate={video?.rate ?? 0}
                publishedAt={video.publishedAt}
                views={modifyNumber<number>(video.viewsAmount)}
              />
            ))}
        </div>
      </main>
    </div>
  )
}
