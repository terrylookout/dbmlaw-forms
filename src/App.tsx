import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import DbmLogo from './images/dbm-logo.png';
import FormButtons from './FormButtons';
import PurchaseForm from './PurchaseForm';

export type FormType =
  'NONE' | 'PURCHASE' | 'SALE' | 'REFINANCE' | 'PURCHASE_AND_SALE' | 'PROJECT_PURCHASE';

const App = (): ReactElement => {

  const [selectedForm, setSelectedForm] = useState<FormType>('NONE');

  useEffect(() => {

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedForm === 'NONE') {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  });

  return (
    <div className="App">
      <div style={{
        padding: '25px 70px',
      }}>
        <div style={{
          width: '100%',
          textAlign: 'left',
        }}>
          <img
            style={{
              height: '80px',
            }}
            src={DbmLogo} alt='DBM Law' />
        </div>

        <div style={{
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}>
          <hr style={{
            width: '100%',
          }} />
        </div>

        {
          <div>
            <FormButtons onFormSelected={(formSelected) => {
              setSelectedForm(formSelected);
            }} />
          </div>
        }

        {
          selectedForm === 'PURCHASE' &&
          <PurchaseForm key={Math.random()}
            dismissed={() => setSelectedForm('NONE')}
          />
        }

      </div>
    </div>
  );
}

export default App;
