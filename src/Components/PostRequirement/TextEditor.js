import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = (props) => {
  const editorRef = useRef(null);

 

  return (
    <>
      <Editor
        apiKey='iqzc2chs08s4j8p2r5j97xczm0z74qk7tlibltqx5rgdru86'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
        onEditorChange={(newValue, editor) => props.onChangeContent(newValue)}
        value={props.value}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'lists advlist',
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          selector: '#tinymce-div',
          branding: false,
          selector: "textarea",
          
             
          placeholder: "Give a detailed description of your requirement",
          toolbar: '| bold italic | code |'+ 'pagebreak',
          selector:"textarea",
          setup: function(editor) {
            editor.on('focus', function() {
             props.setFocus(true)
            });
            editor.on('blur', function(){
              props.setFocus(false)
            })},
          selector: '#myTextarea',
          setup: function (editor) {
            editor.on('init', function (e) {
              editor.setContent(props.value);
            });
          },
          
        
          content_style: '.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { font-size: 18px; font-weight:500; color: #908f8f;}, .mce-content-body{font-size:18px;font-family: inherit;}'

        }}
      />

    </>
  );
}
export default TextEditor;