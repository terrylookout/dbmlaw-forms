import React, { useEffect } from 'react';

const IsRequired = () => {

    useEffect(() => {
        const requiredList = Array.from(document.querySelectorAll('.ts-is-required'));
        if (requiredList) {
            for (const required of requiredList) {
                if (required.className.indexOf('added-title') === -1) {
                    required.className = `${required.className} added-title`;
                    required.closest('div')?.setAttribute('title', 'This is required');
                }
            }
        }
    }, []);

    return (
        <span className="ps-2 position-relative ts-is-required" style={{
            top: '-2px',
        }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#aa0000" className="bi bi-asterisk" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
            </svg>
        </span>
    )
};

export default IsRequired
