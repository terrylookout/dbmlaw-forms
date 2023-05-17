import React from 'react';

interface RadioGroupProps {
    groupName: string;
    children: React.ReactNode;
    makeRow?: boolean;
}

const RadioGroup = ({
    groupName, children, makeRow,
}: RadioGroupProps) => {
    return (
        <>
            <div
                className={`${makeRow !== undefined && !makeRow ? '' : 'row '}rdo-group-dbm`}
                data-groupname={groupName}
                style={{
                    borderRadius: '8px',
                    border: 'none',
                }}>
                {children}
            </div>

            <div className={`rdo-error-${groupName}`}
                style={{
                    display: 'none',
                    color: 'red',
                    fontSize: '0.9rem',
                    margin: '4px 0 20px 5px',
                }}>
                Please select an option
            </div>

        </>
    )
};

export default RadioGroup
