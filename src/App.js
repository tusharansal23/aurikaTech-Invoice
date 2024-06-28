import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InvoiceForm from './components/InvoiceForm';
import BillingDetailsForm from './components/BillingDetailsForm';
import ShippingDetailsForm from './components/ShippingDetailsForm';
import OrderDetailsForm from './components/OrderDetailsForm';
import InvoiceDetailsForm from './components/InvoiceDetailsForm';
import ReverseChargeForm from './components/ReverseChargeForm';
import './App.css';
import ItemDetailsForm from './components/ItemDetailsForm';
import PlaceOfSupplyForm from './components/PlaceOfSupplyForm';
import PlaceOfDeliveryForm from './components/PlaceOfDeliveryForm';
import BackButton from './components/BackButton';
import AutoFillButton from './components/AutoFillButton';
import { ItemProvider } from './components/ItemContext';
import { PlaceProvider } from './components/PlaceContext';
import NetAmountCalculator from './components/NetAmountCalculator';
import ImageUploader from './components/ImageUploader';
import { ImageProvider } from './components/ImageContext';
import { InvoiceFormProvider } from './components/InvoiceFormContext';
import { BillingFormProvider } from './components/BillingFormContext';
import  { ShippingFormProvider } from './components/ShippingFormContext';
import { OrderFormProvider } from './components/OrderContext';
import { InvoiceDetailsFormProvider } from './components/InvoiceDetailsContext';
import { ReverseChargeProvider } from './components/ReverseChargeContext';
import { LogoImageProvider } from './components/LogoImageContext';
import LogoImageUploader from './components/LogoImageUploader';

const App = () => {
  const location = useLocation();

  // Central state for default form values
  const defaultValues = {
    invoice: {
      name: 'John Doe',
      address: '11, block-5th',
      state: 'California',
      city: 'Los Angeles',
      pincode: '90001',
      panNo: 'ABCDE1234F',
      gstNo: 'GSTIN1234567890'
    },
    billingDetails: {
      name: 'John Doe',
      address: '117 TF, Aerial Road',
      state: 'California',
      city: 'Los Angeles',
      pincode: '90001',
      stateUtCode: 'CA123'
    },
    ShippingDetails: {
      name: 'Daniel Stone',
      address: '223 B, Kelvy Building',
      state: 'Amestradam',
      city: 'RotterDam',
      pincode: '1016 LV',
      stateUtCode: '010'
    },
    orderDetails: {
      orderNo: 'ORD123',
      orderDate: '2024-06-06'
    },
    invoiceDetails: {
      invoiceNo: 'INV456',
      invoiceDetails: 'C-709811',
      invoiceDate: '2024-06-09'
    },
    reverseCharge: {
      reverseCharge: 'no'
    },
    itemDetails: {
      description: 'Item Description',
      unitPrice: '100',
      quantity: '1',
      discount: '0'
    },
    placeOfSupply: {
      place: 'California'
    },
    placeOfDelivery: {
      deliveryPlace: 'California'
    }
  };

  // State to manage currently filled form values
  const [formData, setFormData] = useState({
    invoice: {},
    billingDetails: {},
    ShippingDetails: {},
    orderDetails: {},
    invoiceDetails: {},
    reverseCharge: {},
    itemDetails: {},
    placeOfSupply: {},
    placeOfDelivery: {}
  });

  // Function to handle auto-fill button click for specific form
  const handleSpecificAutoFill = (formType, setFormState) => {
    setFormState(defaultValues[formType]);
    setFormData((prevData) => ({
      ...prevData,
      [formType]: defaultValues[formType]
    }));
  };

  return (
    <div className='app-container'>
      <div className='invoice-form-container'>
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
                        <TransitionGroup>
                          <CSSTransition
                            key={location.key}
                            classNames="page"
                            timeout={500}
                          >
                            <Routes location={location}>
                              
                            <Route path="/" element={<LogoImageUploader />} />
                              <Route path="/seller-form" element={<InvoiceForm formData={formData.invoice} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('invoice', setFormState)} />} />
                              <Route path="/billing-details" element={<BillingDetailsForm 
                                formData={formData.billingDetails} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('billingDetails', setFormState)} />} />
                              <Route path="/shipping-details" element={<ShippingDetailsForm 
                                formData={formData.ShippingDetails} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('ShippingDetails', setFormState)} />} />
                              <Route path="/order-details" element={<OrderDetailsForm 
                                formData={formData.orderDetails} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('orderDetails', setFormState)} />} />
                              <Route path="/invoice-details" element={<InvoiceDetailsForm 
                                formData={formData.invoiceDetails} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('invoiceDetails', setFormState)} />} />
                              <Route path="/reverse-charge" element={<ReverseChargeForm 
                                formData={formData.reverseCharge} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('reverseCharge', setFormState)} />} />
                              <Route path="/item-details" element={<ItemDetailsForm 
                                formData={formData.itemDetails} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('itemDetails', setFormState)} />} />
                              <Route path="/place-of-supply" element={<PlaceOfSupplyForm 
                                formData={formData.placeOfSupply} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('placeOfSupply', setFormState)} />} />
                              <Route path="/place-of-delivery" element={<PlaceOfDeliveryForm 
                                formData={formData.placeOfDelivery} 
                                handleAutoFill={(setFormState) => handleSpecificAutoFill('placeOfDelivery', setFormState)} />} />
                              <Route path="/net-amount" element={<NetAmountCalculator />} />
                              <Route path="/image-uploader" element={<ImageUploader />} />
                            </Routes>
                          </CSSTransition>
                        </TransitionGroup>
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
      <div className='bottom-buttons'>
        <BackButton />
      </div>
      </div>
    </div>
  );
};

export default App;
