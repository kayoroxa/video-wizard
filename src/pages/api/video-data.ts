import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.YOUTUBE_API_KEY

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
}) as any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId } = req.query as { videoId: string }
  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' })
  }

  const response = await youtube.videos.list({
    part: 'snippet,statistics',
    id: videoId,
  })

  const video = response.data.items[0]
  const title = video.snippet.title
  const views = video.statistics.viewCount
  const publishedAt = video.snippet.publishedAt
  const channelId = video.snippet.channelId

  const channelResponse = await youtube.channels.list({
    part: 'statistics',
    id: channelId,
  })

  const channel = channelResponse.data.items[0]
  const subscriberCount = channel.statistics.subscriberCount

  res.status(200).json({
    youtubeVideoId: videoId,
    title,
    viewsAmount: Number(views),
    subscriberCount: Number(subscriberCount),
    publishedAt: new Date(publishedAt).getTime(),
  })
}
