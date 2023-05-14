export interface Video {
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
export interface VideoCreate extends Omit<Video, 'id'> {
  id?: number
}
