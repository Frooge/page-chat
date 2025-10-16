import React from 'react';
import logo from '@assets/img/logo.svg';

export default function Popup() {
  const openSidePanel = () => {
    console.log('Opening side panel');
    if (chrome.sidePanel) {
      console.log('chrome.sidePanel is available');
    } else {
      console.log('chrome.sidePanel is not available');
    }
  }

  const closeSidePanel = () => {
    console.log('Closing side panel');
    if (chrome.sidePanel) {
      console.log('chrome.sidePanel is available');
    } else {
      console.log('chrome.sidePanel is not available');
    }
  }

  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
      <header className="flex flex-col items-center justify-center text-white">
        <img src={logo} className="h-36 pointer-events-none animate-spin-slow" alt="logo" />
        <p>
          Edit <code>src/pages/popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="text-blue-400"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <p>Popup styled with TailwindCSS!</p>
        <button className="m-2 p-2 bg-blue-500 rounded cursor-pointer" onClick={openSidePanel}>Open Side Panel</button>
        <button className="m-2 p-2 bg-red-500 rounded cursor-pointer" onClick={closeSidePanel}>Close Side Panel</button>
      </header>
    </div>
  );
}
