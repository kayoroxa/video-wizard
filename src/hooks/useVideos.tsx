import { axiosApi } from '@/utils/axiosApi'
import dictToQuery from '@/utils/dictToQuery'
import { Video } from '@/utils/types/_Video'
import { QueryKey, useQuery } from 'react-query'

function useGet(op: { id?: Video['id']; params?: Partial<Video> } = {}) {
  const query = dictToQuery<Video>(op.params)

  let queryKey: QueryKey = []

  let path = '/videos'
  if (op.id) {
    path = `/videos/${op.id}`
    queryKey = ['video', op.id]
  }
  if (op.params) {
    path = `/videos?${query}`
    queryKey = ['videos', query]
  }

  const getAll = useQuery<Video[]>(
    queryKey,
    async () => {
      const { data } = await axiosApi.get<Video[]>(path)
      return data
    },
    {
      staleTime: 1000 * 60 * 2,
    }
  )
  return getAll
}

function useDelete(id: Video['id']) {
  return useQuery(['videos'], async () => {
    const { data } = await axiosApi.delete(`/videos/${id}`)
    return data
  })
}

function useVideoUpdate(id: Video['id'], updatedVideo: Partial<Video>) {
  return useQuery(['videos'], async () => {
    const { data } = await axiosApi.patch(`/videos/${id}`, updatedVideo)
    return data
  })
}

export const useVideos = () => {
  return {
    get: useGet,
    delete: useDelete,
    update: useVideoUpdate,
  }
}
