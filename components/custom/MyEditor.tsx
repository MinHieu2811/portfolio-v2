"use client";

import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const MyEditor = () => {
  return (
    <Editor
      apiKey="xcrbj26jf3ydi1a8mxpcu5l2o30m4le3u4s0xonhc7h1sf9l"
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
};

export default MyEditor;
