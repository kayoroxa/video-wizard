import { useVideos } from '@/hooks/useVideos'
import { useCategoryStore } from '@/store/CategoryStore'
import { useEffect, useState } from 'react'

export default function PastLinkVideo() {
  // 'https://youtu.be/'
  // 'https://www.youtube.com/'

  const [clipboardData, setClipboardData] = useState<string | null>(null)
  const createVideo = useVideos().create
  const category_id = useCategoryStore(state => state.categoryIdSelected)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('init past')
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardContent = event.clipboardData?.getData('text/plain')
      if (!clipboardContent) return

      const replacedContent = clipboardContent
        .replace(/.*watch\?v\=/gi, '')
        .replace(/.*youtu\.be\//gi, '')
        .replace(/.*youtube\.com\//gi, '')
        .replace(/&.*\=.*/gi, '')

      if (replacedContent.length !== 11) {
        return setClipboardData(null)
      }
      debugger
      setClipboardData(replacedContent)
    }

    document.addEventListener('paste', handlePaste)

    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

  useEffect(() => {
    if (!clipboardData) return

    async function add() {
      setLoading(true)
      const response = await fetch(`/api/video-data?videoId=${clipboardData}`)
      const responseData = await response.json()

      if (!responseData || category_id === null) return

      createVideo({ ...responseData, category_id })
      setClipboardData(null)
      setLoading(false)
    }
    add()
  }, [clipboardData, category_id])

  return {
    clipboardData,
    loading,
  }
}
