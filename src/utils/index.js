import React from 'react';
import { saveAs } from 'file-saver';
import ReactDOM from 'react-dom';
const fileType = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  PDF: 'application/pdf',
};

export const isEmpty = function (value) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

const exportComponent = (node, fileName, backgroundColor, type) => {
  const element = ReactDOM.findDOMNode(node.current);
  import('html2canvas')
    .then((html2canvas) => {
      console.log(html2canvas);
      html2canvas
        .default(element, {
          backgroundColor: backgroundColor,
          // scrollY: -window.scrollY,
          useCORS: true,
        })
        .then((canvas) => saveAs(canvas.toDataURL(type, 1.0), fileName));
    })
    .catch((e) => {
      console('load failed');
    });
};
export const exportComponentAsPNG = (
  node,
  fileName = 'component.png',
  backgroundColor = null,
  type = fileType.PNG
) => {
  exportComponent(node, fileName, backgroundColor, type);
};
