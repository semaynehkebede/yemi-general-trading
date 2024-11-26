import React from 'react'
import { Content } from '../../types/contentType';
export interface updateContentProps {
    selectedItem: Content;
    onClose: (isOpened: boolean) => void;
  }

const ContentUpdate = (props: updateContentProps) => {
  return (
    <div>ContentUpdate</div>
  )
}

export default ContentUpdate