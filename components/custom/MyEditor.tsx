'use client'

import { IAllProps } from '@tinymce/tinymce-react'
import dynamic from 'next/dynamic'
import React, { useId } from 'react'

import { ICrEditor, ISchema } from '@/types'

const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod: any) => mod.Editor), { ssr: false })

export interface ICrHtmlEditor extends Omit<ICrEditor, 'value'>, ISchema, IAllProps {
  onDirtyChanged?: (value: string) => void
}

const config: Partial<IAllProps> = {
  apiKey: 'xcrbj26jf3ydi1a8mxpcu5l2o30m4le3u4s0xonhc7h1sf9l',
  init: {
    plugins:
      'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar:
      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    min_height: 250,
    max_height: 600,
    resize: false,
    branding: false,
    relative_urls: false,
    menubar: false,
    statusbar: true,
    setup: (editor: any) => {
      editor.ui.registry.addContextToolbar('imagealignment', {
        predicate: (node: any) => {
          return node.nodeName.toLowerCase() === 'img'
        },
        items: 'alignleft aligncenter alignright',
        position: 'node',
        scope: 'node'
      })

      editor.ui.registry.addContextToolbar('textselection', {
        predicate: () => {
          return !editor.selection.isCollapsed()
        },
        items: 'bold italic underline',
        position: 'selection',
        scope: 'node'
      })
    },
    content_style: `
      body {
        margin: 0 8px;
      }
    `
  }
  // init: {
  //   min_height: 250,
  //   max_height: 600,
  //   resize: false,
  //   branding: false,
  //   relative_urls: false,
  //   menubar: false,
  //   statusbar: true,
  //   setup: (editor: any) => {
  //     editor.ui.registry.addContextToolbar('imagealignment', {
  //       predicate: (node: any) => {
  //         return node.nodeName.toLowerCase() === 'img'
  //       },
  //       items: 'alignleft aligncenter alignright',
  //       position: 'node',
  //       scope: 'node'
  //     })

  //     editor.ui.registry.addContextToolbar('textselection', {
  //       predicate: () => {
  //         return !editor.selection.isCollapsed()
  //       },
  //       items: 'bold italic underline',
  //       position: 'selection',
  //       scope: 'node'
  //     })
  //   },
  //   toolbar:
  //     'undo redo | formatselect | bold italic underline forecolor backcolor | \
  //     alignleft aligncenter alignright alignjustify | \
  //     outdent indent | bullist numlist | table link image media | removeformat | help | code fullscreen preview',
  //   toolbar_mode: 'wrap',
  //   plugins: [
  //     'advlist autolink lists link image charmap print preview anchor autoresize',
  //     'searchreplace visualblocks code fullscreen',
  //     'insertdatetime media table code help wordcount'
  //   ],
  //   content_style: `
  //     body {
  //       margin: 0 8px;
  //     }
  //   `
  // }
}

const MyEditor = (props: ICrHtmlEditor) => {
  const htmlEditorId = useId()

  const injectAttrs = (ref: any) => {
    const input: HTMLInputElement = ref?.elementRef?.current

    if (!input) return
    input.setAttribute('placeholder', props?.placeholder || '')
    input.setAttribute('id', htmlEditorId)
    input.setAttribute('type', 'number')
  }

  const onEditorChange = (a: string, editor: any) => {
    if (props.onDirtyChanged) {
      if (editor.isDirty()) props.onDirtyChanged(a)
    } else {
      props.onEditorChange && props.onEditorChange(a, editor)
    }
  }

  return (
    <Editor
      {...({
        ...config,
        ...props,
        value: props.value || '',
        ref: injectAttrs,
        onEditorChange,
        init: { ...config.init, ...props.init, file_picker_types: 'media' }
      } as any)}
    />
  )
}

export default MyEditor
