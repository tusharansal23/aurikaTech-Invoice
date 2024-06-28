import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ItemProvider } from './components/ItemContext';
import { PlaceProvider } from './components/PlaceContext';
import { ImageProvider } from './components/ImageContext';
import { InvoiceFormProvider } from './components/InvoiceFormContext';
import { BillingFormProvider } from './components/BillingFormContext';
import { ShippingFormProvider } from './components/ShippingFormContext';
import { OrderFormProvider } from './components/OrderContext';
import { InvoiceDetailsFormProvider } from './components/InvoiceDetailsContext';
import { ReverseChargeProvider } from './components/ReverseChargeContext';
import { LogoImageProvider } from './components/LogoImageContext';

ReactDOM.render(
  <Router>
    <ItemProvider>
      <PlaceProvider>
        <InvoiceFormProvider>
          <BillingFormProvider>
            <ShippingFormProvider>
              <OrderFormProvider>
                <InvoiceDetailsFormProvider>
                  <ReverseChargeProvider>
                    <LogoImageProvider>
                      <ImageProvider>
                        <App />
                      </ImageProvider>
                    </LogoImageProvider>
                  </ReverseChargeProvider>
                </InvoiceDetailsFormProvider>
              </OrderFormProvider>
            </ShippingFormProvider>
          </BillingFormProvider>
        </InvoiceFormProvider>
      </PlaceProvider>
    </ItemProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
