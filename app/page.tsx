'use client'

import { Input } from '@nextui-org/input'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Post } from '@prisma/client'
import { Button } from '@nextui-org/react'
import dompurify from 'dompurify'

import MyEditor from '@/components/custom/MyEditor'
import { Nullable } from '@/types'
import { FileUploader } from '@/components/custom/FileDrop'
import ImageCard from '@/components/ImageCard'
import { copyText } from '@/utils/copyText'
import { ImagePost } from '@/types/form'
import { usePostServices } from '@/services/post-form'
import TagCreator from '@/components/custom/TagCreator'

const inititalPostForm: Nullable<Post> = {
  slug: '',
  content: '',
  title: ''
}

const getUpsertDesription = (description?: string) => {
  return dompurify.sanitize(description || '', { ADD_TAGS: ['iframe'], ADD_ATTR: ['target'] }) || ''
}

export default function Home() {
  const [formCreate, setFormCreate] = useState<Nullable<Post>>(inititalPostForm)
  const [reviewImagesBlob, setReviewImagesBlob] = useState<ImagePost[]>([])
  const { loading: uploading, handleDeleteImg, handleSubmitImage, handleGetAllTags } = usePostServices()
  const [listTags, setListTags] = useState<Array<{ value?: string; count?: number }>>([])

  const handleUpdateListCreateImage = (newItem?: ImagePost) => {
    setReviewImagesBlob([...(reviewImagesBlob ?? []), newItem ?? {}])
  }

  const handleGetListTag = async () => {
    const listTags = await handleGetAllTags()

    setListTags(listTags)
  }

  useEffect(() => {
    handleGetListTag()
  }, [])

  const handleSubmit = () => {
    console.log(formCreate)
  }

  const handleDeleteItem = (publicId: string) => {
    setReviewImagesBlob(reviewImagesBlob?.filter((item) => item?.publicId !== publicId))
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormCreate({
      ...formCreate,
      [e?.target?.name]: e?.target?.value
    })
  }

  const onAutoGenerateSlug = useCallback(() => {
    setFormCreate({
      ...formCreate,
      slug: formCreate?.title?.toLocaleLowerCase()?.trim()?.split(' ')?.join('-')
    })
  }, [formCreate?.title])

  const handleClearInput = (name: keyof Post) => {
    setFormCreate({
      ...formCreate,
      [name]: ''
    })
  }

  return (
    <section className="flex flex-col container m-auto items-center justify-center gap-4 md:py-5">
      <div className="w-full flex">
        <FileUploader
          className="border-1 rounded-lg border-dashed min-w-[300px] border-gray-500"
          height="300px"
          placeholder={uploading ? 'Uploading' : 'Upload image'}
          width="300px"
          onFilesChanged={(e) => handleSubmitImage(e, handleUpdateListCreateImage)}
        />
        <div className="masonry w-full ml-3">
          {reviewImagesBlob?.map((item) => (
            <ImageCard
              key={item?.secureUrl}
              canDelete
              className="masonry-item"
              handleCopySrc={copyText}
              handleDeleteImg={handleDeleteImg}
              handleUpdateList={handleDeleteItem}
              publicId={item?.publicId}
              src={item?.secureUrl}
              uploading={uploading}
            />
          ))}
        </div>
      </div>
      <Input
        isClearable
        label={<p>Cover Image URL</p>}
        name="cover"
        value={formCreate?.cover}
        onChange={handleOnChange}
        onClear={() => handleClearInput('cover')}
      />
      <Input
        isClearable
        label={<p>Title</p>}
        name="title"
        value={formCreate?.title}
        onChange={handleOnChange}
        onClear={() => handleClearInput('title')}
      />
      <Input
        endContent={
          <Button isDisabled={!formCreate?.title} onPress={onAutoGenerateSlug}>
            Generate
          </Button>
        }
        label={<p>Slug</p>}
        name="slug"
        value={formCreate?.slug}
        onChange={handleOnChange}
      />
      <TagCreator listTag={listTags} />
      <MyEditor
        value={formCreate?.content}
        onEditorChange={(e: string) => setFormCreate({ ...formCreate, content: e })}
      />

      <div className="flex items-center">
        <Button type="button" variant="solid" onPress={handleSubmit}>
          Create new Post
        </Button>
      </div>
    </section>
  )
}
