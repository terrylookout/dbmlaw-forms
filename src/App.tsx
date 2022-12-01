import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import DbmLogo from './images/dbm-logo.png';
import FormButtons from './controls/FormButtons';
import PurchaseForm from './forms/PurchaseForm';
import SaleAndPurchaseForm from './forms/SaleAndPurchaseForm';
import SaleForm from './forms/SaleForm';
import 'react-day-picker/dist/style.css';
import RefinanceForm from './forms/RefinanceForm';
import ProjectPurchaseForm from './forms/ProjectPurchaseForm';
import IntroForm from './forms/IntroForm';

export type FormType =
  'INTRO' | 'NONE' | 'PURCHASE' | 'SALE' | 'REFINANCE' | 'SALE_AND_PURCHASE' | 'PROJECT_PURCHASE';

const App = (): ReactElement => {

  const [selectedForm, setSelectedForm] = useState<FormType>('INTRO');

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
      <div className='ms-5 me-5 mt-3 mb-3'>
        <div>
          <img
            style={{
              height: '80px',
            }}
            title='11-30-2022 2'
            src={DbmLogo} alt='DBM Law' />
        </div>

        <div>
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
          selectedForm === 'INTRO' &&
          <IntroForm key={Math.random()}
            dismissed={() => setSelectedForm('NONE')}
          />
        }

        {
          selectedForm === 'PURCHASE' &&
          <PurchaseForm key={Math.random()}
            dismissed={() => setSelectedForm('NONE')}
          />
        }

        {
          selectedForm === 'SALE' &&
          <SaleForm key={Math.random()}
            dismissed={() => setSelectedForm('NONE')}
          />
        }

        {
          selectedForm === 'REFINANCE' &&
          <RefinanceForm key={Math.random()}
            dismissed={() => setSelectedForm('NONE')}
          />
        }

        {
          selectedForm === 'SALE_AND_PURCHASE' &&
          <SaleAndPurchaseForm key={Math.random()}
            dismissed={() => setSelectedForm('NONE')}
          />
        }

        {
          selectedForm === 'PROJECT_PURCHASE' &&
          <ProjectPurchaseForm key={Math.random()}
            dismissed={() => setSelectedForm('NONE')}
          />
        }

      </div>
    </div>
  );
}

export default App;
