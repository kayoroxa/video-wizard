import { Channel } from '@/utils/types/_Channel'
import { myUseQuery } from './myUseQuery'

export const useChannels = () => {
  const crudFuncs = myUseQuery<Channel>({
    pluralLabel: 'channels',
    singularLabel: 'channel',
  })

  return crudFuncs
}
