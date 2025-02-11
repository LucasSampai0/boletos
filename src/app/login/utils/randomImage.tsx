import React from 'react';

interface RandomImageProps {
    imagePaths: string[];
}

const RandomImage: React.FC<RandomImageProps> = ({ imagePaths }) => {
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imagePaths.length);
        return imagePaths[randomIndex];
    };

    const randomImage = getRandomImage();

    return (
        <div
            style={{
                backgroundImage: `url(${randomImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                filter: 'blur(10px)',
            }}
        />
    );
};

export default RandomImage;