import { axiosApi } from '@/utils/axiosApi'
import { Video } from '@/utils/types/_Video'
import { useQuery } from 'react-query'

export const useVideos = (id?: Video['id']) => {
  const getAll = useQuery<Video[]>(
    ['videos'],
    async () => {
      const { data } = await axiosApi.get<Video[]>(`/videos`)
      return data
    },
    {
      staleTime: 1000 * 60 * 2,
    }
  )
}
