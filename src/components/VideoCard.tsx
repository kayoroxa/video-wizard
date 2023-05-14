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
    <div className="shadow-2xl">
      <img src={url} className="w-60" alt="" />
      <h1>{title}</h1>
      <footer className="flex gap-3">
        <span>{views} views</span>
        <span>{publishedAt}</span>
        <span>{rate}</span>
      </footer>
    </div>
  )
}
