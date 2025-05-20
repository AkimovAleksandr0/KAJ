import React from 'react';

const MediaPage = () => {
    return (
        <div className="media-page">
            <video controls poster="/public/media/poster.jpg">
                <source src="/public/media/video.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default MediaPage;