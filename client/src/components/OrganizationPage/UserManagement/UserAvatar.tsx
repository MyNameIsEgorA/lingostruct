import React from 'react';
import Image from 'next/image';

const CircleComponent: React.FC<{item: string}> = ({ item }) => {
    const isUrl = (value: string) => {
        try {
            new URL(value);
            return true;
        } catch (_) {
            return false;
        }
    };

    const getInitials = (name: string): string => {
        const words: string[] = name.split(' ');
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        } else {
            return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
        }
    };

    return (
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg relative">
            {isUrl(item) ? (
                <Image
                    src={item}
                    alt="Profile"
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                />
            ) : (
                <span className="initials">{getInitials(item)}</span>
            )}
        </div>
    );
};

export default CircleComponent;