import React, { ReactElement } from 'react';

interface GoBackProps {
    onClicked: () => void;
}

const GoBack = (props: GoBackProps): ReactElement => {

    return (
        <div style={{
            width: '100%',
            textAlign: 'left',
            padding: '40px 20px',
        }}>
            <input type='button' value='<< Go back / Cancel' className='btn btn-primary form-button' onClick={() => props.onClicked()} />
        </div>
    )
};

export default GoBack;
