export interface Video {
  id: number
  title: string
  rate?: number
  url: string
  thumbnailUrl: string
  youtubeVideoId: string
  channel_id?: number
  category_id?: number
  viewsAmount: number
  publishedAt: number
  createdAt?: number
  updatedAt?: number
  subscriberCount?: number
}
export interface VideoCreate extends Omit<Video, 'id'> {
  id?: number
}
