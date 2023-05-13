import { useVideos } from '@/hooks/useVideos'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: videos } = useVideos().get()

  return <div>{JSON.stringify(videos)}</div>
}
