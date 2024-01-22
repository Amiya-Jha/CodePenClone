import React from "react";
// import logo from ''

function Navbar({ resetCode, downloadFile }) {
  return (
    <div className="main flex flex-wrap justify-between items-center px-4 bg-[#000000] py-4">
      <div className="left">
        <div className="logo font-bold text-2xl text-white text-center">
          <img className=" w-36" src="img/codepen.png" alt="" />
        </div>
      </div>
      <div className="right">
        <button
          className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-4"
          onClick={downloadFile}
        >
          Download
        </button>
        <button
          onClick={resetCode}
          className="bg-red-500 hover:bg-red-900 text-white py-2 px-3 rounded "
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Navbar;
