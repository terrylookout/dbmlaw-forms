import React, { ReactElement } from 'react';

interface SubmitButtonProps {
    onClicked: () => void;
}

const SubmitButton = (props: SubmitButtonProps): ReactElement => {

    return (
        <div style={{
            width: '100%',
            padding: '40px 10px',
        }}>
            <input type='button' value='Submit' className='btn btn-primary form-button' onClick={() => props.onClicked()} />
        </div>
    )
};

export default SubmitButton;
