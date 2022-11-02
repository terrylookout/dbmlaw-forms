import React, { ReactElement, useState } from 'react';
import './App.css';
import DbmLogo from './images/dbm-logo.png';
import FormButtons from './FormButtons';
import PurchaseForm from './PurchaseForm';
import GoBack from './GoBack';

export type FormType =
  'NONE' | 'PURCHASE' | 'SALE' | 'REFINANCE' | 'PURCHASE_AND_SALE' | 'PROJECT_PURCHASE';

declare var bootstrap: any;

const App = (): ReactElement => {

  const [selectedForm, setSelectedForm] = useState<FormType>('NONE');

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
          //selectedPage === 'NONE' &&

          <div>
            <FormButtons onFormSelected={(formSelected) => {
              setSelectedForm(formSelected);

              // eslint-disable-next-line
              new bootstrap.Modal('#formModal').show();

            }} />
          </div>
        }

        {
          <div className="modal fade" id="formModal" tabIndex={-1} aria-labelledby="formModalLabel" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {
                      (selectedForm && 'PURCHASE') &&
                      `Purchase`
                    }

                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <PurchaseForm />
                </div>

              </div>
            </div>
          </div>

        }

      </div>
    </div>
  );
}

export default App;
