import { Video } from './types/_Video'

function calcularDiferencaEmDias(timestamp: number) {
  const umDiaEmMilissegundos = 24 * 60 * 60 * 1000
  const dataAtual = new Date().setHours(0, 0, 0, 0)
  const dataDoTimestamp = new Date(timestamp).setHours(0, 0, 0, 0)
  return Math.floor((dataAtual - dataDoTimestamp) / umDiaEmMilissegundos)
}

export default function getRate(video: Video) {
  const viewsPerDay = Math.round(
    video.viewsAmount / calcularDiferencaEmDias(video.publishedAt)
  )
  if (!video.subscriberCount) return 0
  debugger
  return viewsPerDay / video.subscriberCount
}

export function getViewsPerDay(video: Video) {
  const result = Math.round(
    video.viewsAmount / calcularDiferencaEmDias(video.publishedAt)
  )

  return result
}
