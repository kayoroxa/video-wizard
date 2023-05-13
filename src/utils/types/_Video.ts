export interface Video {
  id: number
  title: string
  description: string
  url: string
}
export interface VideoCreate extends Omit<Video, 'id'> {
  id?: number
}
