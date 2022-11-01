import React, { ReactElement, useState } from 'react';
import './App.css';
import DbmLogo from './images/dbm-logo.png';
import FormButtons from './FormButtons';
import PurchaseForm from './PurchaseForm';
import GoBack from './GoBack';

export type FormType =
  'NONE' | 'PURCHASE' | 'SALE' | 'REFINANCE' | 'PURCHASE_AND_SALE' | 'PROJECT_PURCHASE';

const App = (): ReactElement => {

  const [selectedPage, setSelectedPage] = useState<FormType>('NONE');

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
          selectedPage === 'NONE' &&

          <div>
            <FormButtons onFormSelected={(formSelected) => setSelectedPage(formSelected)} />
          </div>
        }

        {
          selectedPage !== 'NONE' &&
          <div>
            <GoBack onClicked={() => setSelectedPage('NONE')} />
          </div>
        }

        {
          selectedPage === 'PURCHASE' &&

          <div>
            <PurchaseForm />
          </div>
        }

      </div>
    </div>
  );
}

export default App;
