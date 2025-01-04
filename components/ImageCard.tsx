/* eslint-disable @next/next/no-img-element */
import { Button } from '@nextui-org/button'
import React, { ComponentProps, useState } from 'react'
import { Card, CardBody } from '@nextui-org/react'

import { CopyIcon, DeleteIcon } from './icons'

import { FuncDeleteImage } from '@/services/post-form'

type ImageCardProps = ComponentProps<'img'> & {
  canDelete?: boolean
  publicId?: string
  uploading?: boolean
  handleCopySrc?: (id: string) => void
  handleDeleteImg?: FuncDeleteImage
  handleUpdateList?: (id: string) => void
}

const ImageCard = ({
  src,
  width = 300,
  height = 300,
  publicId,
  alt,
  className,
  canDelete,
  handleCopySrc,
  handleDeleteImg,
  handleUpdateList
}: ImageCardProps) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <Button
        isIconOnly
        className="absolute top-1 right-2 z-10"
        size="sm"
        variant="solid"
        onClick={() => handleCopySrc?.(src ?? '')}
      >
        <CopyIcon size={16} />
      </Button>
      {canDelete && (
        <Button
          isIconOnly
          className="absolute top-1 right-12 z-10"
          isLoading={loading}
          size="sm"
          variant="solid"
          onClick={() =>
            handleDeleteImg?.({
              publicId: publicId ?? '',
              handleLoading: () => setLoading(!loading),
              handleUpdateList: handleUpdateList
            })
          }
        >
          <DeleteIcon size={16} />
        </Button>
      )}
      <Card className="rounded-lg border-1 border-dashed border-indigo-500">
        <CardBody className="p-0 rounded-lg">
          <img alt={alt} className="rounded-lg " height={height} src={src} width={width} />
        </CardBody>
      </Card>
    </div>
  )
}

export default ImageCard
