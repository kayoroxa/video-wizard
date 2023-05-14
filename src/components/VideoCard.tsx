interface Props {
  url: string
  views: number
  title: string
  publishedAt: number
  rate: number
  channel_id?: number
}

export default function VideoCard({
  url,
  title,
  views,
  publishedAt,
  rate,
}: Props) {
  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden w-80">
      <img src={url} className="w-full" alt="" />
      <main className="p-3 bg-blue-600 h-full">
        <h1>{title}</h1>
        <footer className="flex gap-3">
          <span>{views} views</span>
          <span>{publishedAt}</span>
          <span>{rate}</span>
        </footer>
      </main>
    </div>
  )
}
