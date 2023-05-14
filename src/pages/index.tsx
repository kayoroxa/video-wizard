import VideoCard from '@/components/VideoCard'
import { useCategories } from '@/hooks/useCategories'
import { useVideos } from '@/hooks/useVideos'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: categories } = useCategories().get()
  const { data: videos, isSuccess } = useVideos().get()

  return (
    <div className="flex flex-col">
      {/* <div>{JSON.stringify(videos)}</div> */}
      <main className="p-4 flex gap-5">
        {categories?.map(category => {
          return <div key={category.id}>{category.name}</div>
        })}
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
              views={video.views}
            />
          ))}
      </main>
    </div>
  )
}
