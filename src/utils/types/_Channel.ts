export interface Channel {
  id: number
  title: string
  url: string
  rate?: number
  publishedAt: number
  views: number
  channel_id?: number
  thumbnailUrl: string
  youtubeVideoId: number
  viewsAmount: number
  createdAt?: number
  updatedAt?: number
}
export interface ChannelCreate extends Omit<Channel, 'id'> {
  id?: number
}
