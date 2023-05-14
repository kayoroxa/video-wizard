import { Video } from '@/utils/types/_Video'
import { myUseQuery } from './myUseQuery'

export const useVideos = () => {
  const crudFuncs = myUseQuery<Video>({
    pluralLabel: 'videos',
    singularLabel: 'video',
  })

  return crudFuncs
}
