// MediaPage component that displays a video with a poster image.
import React from 'react';

const MediaPage = () => {
    return (
        <div className="media-page">
            <video controls poster="/media/poster.jpg">
                <source src="/media/video.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default MediaPage;