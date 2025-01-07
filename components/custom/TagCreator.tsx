'use client'

import { Autocomplete, AutocompleteItem, Card, CardBody, Chip, Tooltip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

type TagCreatorProps = {
  listTag: Array<{ value?: string; count?: number }>
  className?: string
}

const TagCreator = ({ listTag = [], className }: TagCreatorProps) => {
  const [keyword, setKeyword] = useState('')
  const [suggestion, setSuggestion] = useState<Array<{ label: string; key: string; description: string }>>([])
  const [tags, setTags] = useState<Array<{ label?: string; key?: string; description?: string }>>([])

  useEffect(() => {
    setSuggestion(
      listTag
        ?.filter((tag) => tag?.value?.includes(keyword))
        ?.map((tag) => ({
          label: tag?.value ?? '',
          key: tag?.value ?? '',
          description: `${tag?.count} post${(tag?.count ?? 0) > 1 ? 's' : ''} used this tag`
        }))
    )
  }, [keyword])

  const handleSelectionChange = (e: string | number | null) => {
    if (!`${e}`?.length || tags?.some((x) => x?.key === e)) return
    const newTag = listTag?.find((i) => i?.value === e)

    if (newTag) {
      setTags([
        ...tags,
        {
          key: newTag?.value,
          label: newTag?.value,
          description: `${newTag?.count} post${(newTag?.count ?? 0) > 1 ? 's' : ''} used this tag`
        }
      ])
      setKeyword('')
    }
  }

  const handleDeleteTag = (key: string) => {
    setTags(tags?.filter((item) => item?.key !== key))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !!keyword.trim()?.length) {
      const newTag = {
        label: keyword.trim(),
        key: keyword.trim(),
        description: 'This is a new tag'
      }

      const existTag = listTag?.find((i) => i?.value === keyword)
      const updateData = existTag
        ? {
            label: existTag?.value,
            key: existTag?.value,
            description: `${existTag?.count} post${(existTag?.count ?? 0) > 1 ? 's' : ''} used this tag`
          }
        : newTag

      if (!tags.some((tag) => tag.key === newTag.key)) {
        setTags([...tags, updateData])
      }

      setKeyword('')
    }
  }

  const handleValueChange = (e: string) => {
    if (!e?.length || tags?.some((x) => x?.key === e)) return
    setKeyword(e)
  }

  return (
    <div className={`w-full flex ${className}`}>
      <Autocomplete
        className="w-fit"
        defaultItems={suggestion}
        disabledKeys={tags?.map((item) => item?.key ?? '')}
        label="Tags"
        listboxProps={{
          emptyContent: 'No options'
        }}
        placeholder="Select tags"
        startContent={`#`}
        value={keyword}
        variant="bordered"
        onInputChange={handleValueChange}
        onKeyDown={handleKeyDown}
        onSelectionChange={handleSelectionChange}
        // onValueChange={handleSelectionChange}
      >
        {(tag: { label: string; key: string; description: string }) => (
          <AutocompleteItem key={tag?.key}>{tag?.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <Card className="ml-2">
        <CardBody className="w-full flex-1 pt-1 flex flex-row flex-wrap">
          {!!tags?.length ? (
            <>
              {tags?.map((item) => (
                <span key={item?.key} className="mr-2 mt-2">
                  <Tooltip content={item?.description} showArrow={true}>
                    <Chip onClose={() => handleDeleteTag(item?.key ?? '')}>#{item?.label}</Chip>
                  </Tooltip>
                </span>
              ))}
            </>
          ) : (
            <p className="content-center">Please fill in tags</p>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

export default TagCreator
