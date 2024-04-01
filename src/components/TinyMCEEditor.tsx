import { useEffect, useRef } from 'react';
// import { Editor } from '../assets/tinymce/tinymce';
// import { Editor } from 'tinymce';

declare global {
  interface Window {
    tinymce: Editor;
  }
}

interface editorProps {
  value: string | undefined;
}

interface Editor {
  get: (arg0: string) => e;
  init: (arg0: object) => void;
  remove: (arg0: string) => void;
}
interface e {
  b: boolean;
  remove: () => void;
}

const TinyMCEEditor = ({ value }: editorProps) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!window.tinymce.get('text')) {
      window.tinymce.init({
        selector: '#text',
        license_key: 'gpl',
        height: 340,
        width: 500,
        menubar: false,
        statusbar: false,
        skin: 'oxide-dark',
      });
    }

    return () => {
      const editor = window.tinymce.get('text');
      if (typeof editor !== 'undefined') {
        editor.remove();
      }
    };
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      name='text'
      id='text'
      defaultValue={value ? value : ''}
    />
  );
};

export default TinyMCEEditor;
