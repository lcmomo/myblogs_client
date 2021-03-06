import React from 'react'

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { translateMarkdown } from '../../utils'

export default function MdEditor(props) {
  return (
   <SimpleMDE value={ props.value
   } onChange={props.onChange} options={{ autofocus: true, autoSave: true, previewRender: translateMarkdown }} />
  )
}
