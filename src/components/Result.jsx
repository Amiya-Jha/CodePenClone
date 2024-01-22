import React from 'react'

function Result({srcCode}) {
    return (
        <div>
            <div className="bg-[#ffffff] mt-4">
                <iframe
                    className="w-full h-full min-h-[18.5rem]"
                    srcDoc={srcCode}
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        </div>
    )
}

export default Result