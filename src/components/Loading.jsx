import React from 'react';
import { Loader } from 'rsuite';


const Loading = () => {


    return (
        <div className={` fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center`
        }>
            <div className="bg-white h-2/4 w-1/2 rounded-2xl p-8 flex flex-col gap-y-7 items-center justify-center">
                <img src="/nav_logo.png" alt="" />
                <Loader size="lg" vertical content="Loading..." />
            </div>
        </div >
    );
};

export default Loading;