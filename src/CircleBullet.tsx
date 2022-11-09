import { ReactElement } from "react";


const CircleBullet = (): ReactElement => {

    return (
        <span style={{
            marginRight: '10px',
        }}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{
                height: '10px',
                position: 'relative',
                top: '-1px',
            }}>
                <circle cx="50" cy="50" r="50" style={{
                    fill: '#555555',
                }} />
            </svg>
        </span >

    )
};

export default CircleBullet;