import React from 'react';

const VirtualTourViewer = ({ tourUrl }) => {
    return (
        <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
                src={tourUrl}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                }}
                allowFullScreen
                title="Virtual Tour"
            />
        </div>
    );
};

export default VirtualTourViewer;