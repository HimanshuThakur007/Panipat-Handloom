/* eslint-disable react/prop-types */
import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build"
import './texteditorStyle.css'
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const TextEditor = ({setCkData,data}) => {
  // console.log('ckData',data)
  const [myCkData, setMyCkData]= React.useState(data)
  React.useEffect(() => {
    if (data) {
      setMyCkData(data);
      setCkData(data)
    }
  }, [data]);

  const handleEditorChange = (event, editor) => {
    const newData = editor.getData();
    // console.log('data', newData);
    setMyCkData(newData);
    setCkData(newData)
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={myCkData}
        onChange={handleEditorChange}
        
      />
    </div>
  )
}

export default TextEditor
