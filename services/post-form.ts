import { useCallback, useState } from 'react'

import { ImagePost } from '@/types/form'
import { genSid } from '@/utils/genSid'
import { axiosImageInstance } from '@/lib/axios'

const usePostServices = (): PostServiceType => {
  const [loading, setLoading] = useState(false)

  const handleSubmitImage = useCallback(async (files: Blob[], handleUpdateList?: (newItem: ImagePost) => void) => {
    try {
      const id = genSid()

      setLoading(true)
      handleUpdateList?.({
        secureUrl: '',
        publicId: id
      })
      const formData = new FormData()

      if (files?.length > 1) {
        files?.forEach((file) => {
          formData.append('file', file)
        })
      } else {
        formData?.append('file', files[0])
      }
      formData.append('upload_preset', 'eyf8dpkh')
      const res = await axiosImageInstance.post('https://api.cloudinary.com/v1_1/dp9xqwrsz/image/upload', formData)

      handleUpdateList?.({
        secureUrl: res?.data?.secure_url ?? '',
        publicId: res?.data?.public_id,
        signature: res?.data?.signature,
        assetId: res?.data?.asset_id,
        resourceType: res?.data?.resource_type,
        type: res?.data?.type
      })
    } catch (error: unknown) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDeleteImg = useCallback(
    async ({
      publicId,
      handleLoading,
      handleUpdateList
    }: {
      publicId: string
      handleLoading?: () => void
      handleUpdateList?: (publicId: string) => void
    }) => {
      try {
        handleLoading?.()
        const res = await axiosImageInstance.post('/delete-image', {
          public_id: publicId
        })

        if (res?.data?.result === 'ok') {
          handleUpdateList?.(publicId)
        }
      } catch (error) {
        console.error(error)
      } finally {
        handleLoading?.()
      }
    },
    []
  )

  const handleGetAllTags = useCallback(async () => {
    try {
      setLoading(true)

      const res = await axiosImageInstance.get('/list-tags')

      return res?.data
    } catch (error) {
      console.error(error)

      return []
    } finally {
      setLoading(true)
    }
  }, [])

  return {
    loading,
    handleSubmitImage,
    handleDeleteImg,
    handleGetAllTags
  }
}

export type PostServiceType = {
  loading: boolean
  handleSubmitImage: FuncSubmitImage
  handleDeleteImg: FuncDeleteImage
  handleGetAllTags: () => Promise<Array<{ value?: string; count?: number }>>
}

export type FuncSubmitImage = (files: Blob[], handleUpdateList?: (newItem: ImagePost) => void) => Promise<void>
export type FuncDeleteImage = ({
  publicId,
  handleLoading,
  handleUpdateList
}: {
  publicId: string
  handleLoading?: () => void
  handleUpdateList?: (publicId: string) => void
}) => Promise<void>

export { usePostServices }
