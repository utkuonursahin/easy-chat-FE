import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="row-start-3 col-span-full p-2 flex flex-col gap-4 text-primary-foreground bg-gradient-to-br from-blue-800 to-indigo-900">
            <p className="col-span-full flex justify-center items-center gap-1 text-xs">
                EasyChat &trade; made with <Heart fill="#fff" size={14} /> by utkuonursahin{' '}
            </p>
        </footer>
    );
};

export default Footer;
