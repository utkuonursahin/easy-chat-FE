import React from 'react';

const AnimatedMenuIcon = () => {
    return (
        <label htmlFor="check" className="relative flex flex-col justify-center gap-1.5 w-10 h-10 ml-auto ring-1 ring-neutral-300
rounded-md p-2 hover:shadow hover:shadow-neutral-400">
            <input id="check" type="checkbox" className="hamburger-checkbox invisible hidden"/>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
        </label>
    );
};

export default AnimatedMenuIcon;