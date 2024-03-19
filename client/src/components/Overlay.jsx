import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vsDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { VscClose } from "react-icons/vsc";
const Overlay = ({displayInfo, setDisplayInfo}) => {
  return (
    <div className='absolute min-h-screen w-full flex items-center justify-center z-50 bg-neutral-900/80 bg-blend-overlay'>
        <div className='p-5 lg:w-[40vw] w-[70vw] min-h-[70vh] bg-secondary text-white rounded-md shadow-xl'>
            <div className="flex items-center mb-4 gap-4">
              <div onClick={() => setDisplayInfo(null)} className='bg-[#333] p-2 rounded-full cursor-pointer'>
                <VscClose />
              </div>
                Submitted Code
            </div> 
            <SyntaxHighlighter language="javascript" style={vsDark}>
                {displayInfo.sourceCode}
            </SyntaxHighlighter>
        </div>
    </div>
  )
}

export default Overlay
