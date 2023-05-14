import { axiosApi } from '@/utils/axiosApi'
import dictToQuery from '@/utils/dictToQuery'
import { QueryKey, useQuery } from 'react-query'

interface Props {
  pluralLabel: string
  singularLabel: string
}

export function myUseQuery<Type extends { id: unknown }>({
  pluralLabel,
  singularLabel,
}: Props) {
  function useGet(op: { id?: Type['id']; params?: Partial<Type> } = {}) {
    const query = dictToQuery<Type>(op.params)

    let queryKey: QueryKey = []

    let path = `/${pluralLabel}`

    if (op.id) {
      path = `/${pluralLabel}/${op.id}`
      queryKey = [singularLabel, op.id]
    } else if (op.params) {
      path = `/${pluralLabel}?${query}`
      queryKey = [pluralLabel, query]
    } else {
      queryKey = [pluralLabel]
    }

    const getAll = useQuery<Type[]>(
      queryKey,
      async () => {
        const { data } = await axiosApi.get<Type[]>(path)
        return data
      },
      {
        staleTime: 1000 * 60 * 2,
      }
    )

    return {
      ...getAll,
      data: getAll.data as Type[],
    }
  }

  function useDelete(id: Type['id']) {
    return useQuery([pluralLabel], async () => {
      const { data } = await axiosApi.delete(`/${pluralLabel}/${id}`)
      return data
    })
  }

  function useUpdate(id: Type['id'], updatedData: Partial<Type>) {
    return useQuery([pluralLabel], async () => {
      const { data } = await axiosApi.patch(
        `/${pluralLabel}/${id}`,
        updatedData
      )
      return data
    })
  }

  function useCreate(dataCreate: Partial<Type>) {
    return useQuery([pluralLabel], async () => {
      const { data } = await axiosApi.post(`/${pluralLabel}`, dataCreate)
      return data
    })
  }

  return {
    get: useGet,
    delete: useDelete,
    update: useUpdate,
    create: useCreate,
  }
}
