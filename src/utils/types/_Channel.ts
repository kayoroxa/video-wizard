export interface Channel {
  id: number
  subscribers?: number
  name: string
  url: string
  videosAmount?: number
  category_id?: number
  createdAt?: number
  updatedAt?: number
}
export interface ChannelCreate extends Omit<Channel, 'id'> {
  id?: number
}
