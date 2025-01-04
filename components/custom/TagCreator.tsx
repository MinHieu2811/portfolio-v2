'use client'

import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

type TagCreatorProps = {
  listTag: Array<{ value: string; count: number }>
  className?: string
}

const TagCreator = ({ listTag = [], className }: TagCreatorProps) => {
  const [keyword, setKeyword] = useState('')
  const [suggestion, setSuggestion] = useState<Array<{ label: string; key: string; description: string }>>([])

  useEffect(() => {
    setSuggestion(
      listTag
        ?.filter((tag) => tag?.value?.includes(keyword))
        ?.map((tag) => ({
          label: tag?.value,
          key: tag?.value,
          description: `${tag?.count} post${tag?.count > 1 ? 's' : ''} used this tag`
        }))
    )
  }, [keyword])

  return (
    <div className={`${className}`}>
      {/* <AutocompleteSection> */}
      <Autocomplete
        defaultItems={suggestion}
        label="Tags"
        listboxProps={{
          emptyContent: 'This tag is new!'
        }}
        placeholder="Select tags"
        value={keyword}
        variant="bordered"
        onValueChange={(e) => setKeyword(e)}
      >
        {/* <AutocompleteSection> */}
        {(tag: { label: string; key: string; description: string }) => (
          <AutocompleteItem key={tag?.key}>{tag?.label}</AutocompleteItem>
        )}
        {/* </AutocompleteSection> */}
      </Autocomplete>
      {/* </AutocompleteSection> */}
    </div>
  )
}

export default TagCreator
