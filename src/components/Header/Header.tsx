import React from 'react';
import AnimatedMenuIcon from "@/components/Header/AnimatedMenuIcon";

const Header = () => {
    return (
        <header className="row-start-1 col-span-full w-full h-full shadow-lg shadow-dark-800 flex items-center px-8">
            <AnimatedMenuIcon/>
        </header>
    );
};

export default Header;