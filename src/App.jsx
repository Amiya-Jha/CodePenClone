import React, { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import Result from "./components/Result";
import Modal from "react-modal";
import htmlImage from './assets/html.png';
import cssImage from './assets/css.png';
import jsImage from './assets/js.png';


function App() {
  const [htmlEdit, setHtmlEdit] = useState("");
  const [cssEdit, setCssEdit] = useState("");
  const [jsEdit, setJsEdit] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  //* Html onchange handler
  const onChangeHtml = useCallback((value) => {
    // console.log(value);
    setHtmlEdit(value);
  }, []);

  //* Css onchange handler
  const onChangeCss = useCallback((value) => {
    // console.log(value);
    setCssEdit(value);
  }, []);

  //* JavaScript onchange handler
  const onChangeJavaScript = useCallback((value) => {
    // console.log(value);
    setJsEdit(value);
  }, []);

  //* Create Html Document for result
  const srcCode = `
  <html>
      <body>${htmlEdit}</body>
      <style>${cssEdit}</style>
      <script>${jsEdit}</script>
  </html>
  `;

  const generateSrcCode = () => {
    return srcCode;
  };

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const downloadFileWithAlert = () => {
    const content = generateSrcCode();

    // Check if all sections (HTML, CSS, JavaScript) are empty
    if (
      htmlEdit.trim() === "" &&
      cssEdit.trim() === "" &&
      jsEdit.trim() === ""
    ) {
      // Open the custom alert modal
      openAlert();
      return;
    }

    // If not empty, proceed with download
    try {
        const blob = new Blob([content], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "source_code.html";

        link.click();
    } catch (error) {
        console.error("Error generating or downloading file:", error);
    }
  };

  const resetCode = () => {
    setHtmlEdit("");
    setCssEdit("");
    setJsEdit("");
  };

  return (
    <div>
      <Navbar downloadFile={downloadFileWithAlert} resetCode={resetCode} />
      {/* main content  */}
      <div>        
        <hr />
        {/* Editor  */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Html Editor */}
          <div className="bg-[#000000] px-4 mb-4 lg:pr-0 lg:mb-0">
            <img className=" h-10" src={htmlImage} alt="HTML" />
            {/* <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2> */}
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={htmlEdit}
              height="300px"
              theme="dark"
              extensions={[html(true)]}
              onChange={onChangeHtml}
            />
          </div>

          {/* Css Editor  */}
          <div className="bg-[#000000] px-4 mb-4 lg:pr-0 lg:mb-0">
            <img className=" h-10" src={cssImage}  alt="CSS" />
            {/* <h2 className="text-lg font-semibold mb-2 text-white">CSS</h2> */}
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={cssEdit}
              height="300px"
              theme="dark"
              extensions={[css(true)]}
              onChange={onChangeCss}
            />
          </div>

          {/* JavaScript Editor  */}
          <div className="bg-[#000000] px-4 lg:pr-0">
            <img className=" h-10" src={jsImage}  alt="JavaScript" />

            {/* <h2 className="text-lg font-semibold mb-2 text-white">JavaScript</h2> */}
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={jsEdit}
              height="300px"
              theme="dark"
              extensions={[javascript(true)]}
              onChange={onChangeJavaScript}
            />
          </div>
        </div>
        <Result srcCode={srcCode} />
      </div>
      {/* Custom Alert Modal */}
      <Modal
        isOpen={isAlertOpen}
        onRequestClose={closeAlert}
        contentLabel="Custom Alert"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="text-center">
          <p className="text-xl font-semibold mb-2 ">Alert</p>
          <p>Source code is empty. Please add some code before downloading.</p>
          <button
            onClick={closeAlert}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
