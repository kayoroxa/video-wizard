interface Props {
  url: string
  views: number
  title: string
  publishedAt: number
  rate: number
  channel_id?: number
}

function calcularDiferencaEmDias(timestamp: number) {
  const umDiaEmMilissegundos = 24 * 60 * 60 * 1000
  const dataAtual = new Date().setHours(0, 0, 0, 0)
  const dataDoTimestamp = new Date(timestamp).setHours(0, 0, 0, 0)
  return Math.floor((dataAtual - dataDoTimestamp) / umDiaEmMilissegundos)
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
        <h1 className="">{title}</h1>
        <footer className="flex gap-3">
          <span className="bg-blue-400">{views} views</span>
          <span className="bg-blue-400">
            {new Date(publishedAt).toLocaleDateString('pt-br')}
          </span>
          <span className="bg-blue-400">
            {views / calcularDiferencaEmDias(publishedAt)} Views per day
          </span>
        </footer>
      </main>
    </div>
  )
}
