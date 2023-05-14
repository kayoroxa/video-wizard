export interface Video {
  id: number
  title: string
  rate?: number
  url: string
  thumbnailUrl: string
  youtubeVideoId: number
  channel_id?: number
  category_id?: number
  viewsAmount: number
  publishedAt: number
  createdAt?: number
  updatedAt?: number
}
export interface VideoCreate extends Omit<Video, 'id'> {
  id?: number
}
