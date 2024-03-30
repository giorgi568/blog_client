import React, { useEffect } from 'react';
import { Editor } from 'tinymce';

declare global {
  interface Window {
    tinymce: Editor;
  }
}

interface editorProps{
  value: string | undefined
}

const TinyMCEEditor = ({value}: editorProps) => {
  useEffect(() => {
    window.tinymce.init({
      selector: '#text',
      license_key: 'gpl',
      height: 340,
      width: 500,
      menubar: false,
      statusbar: false,
    });
  }, []);

  return <textarea name='text' id='text' defaultValue={value ? value : ''}/>;
};

export default TinyMCEEditor;
