import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from './ItemContext';
import { PlaceContext } from './PlaceContext';
import { ImageContext } from './ImageContext';
import { LogoImageContext } from './LogoImageContext';
import { InvoiceFormContext } from './InvoiceFormContext';
import { BillingFormContext } from './BillingFormContext';
import { ShippingFormContext } from './ShippingFormContext';
import { OrderFormContext } from './OrderContext';
import { InvoiceDetailsFormContext } from './InvoiceDetailsContext';
import { ReverseChargeContext } from './ReverseChargeContext';
import num2words from 'num2words';

const NetAmountCalculator = () => {
  const [items] = useContext(ItemContext);
  const { placeOfSupply: rawPlaceOfSupply, placeOfDelivery: rawPlaceOfDelivery } = useContext(PlaceContext);
  const { invoiceFormData } = useContext(InvoiceFormContext);
  const { billingFormData } = useContext(BillingFormContext);
  const { shippingFormData } = useContext(ShippingFormContext);
  const { orderFormData } = useContext(OrderFormContext);
  const { invoiceDetailsFormData } = useContext(InvoiceDetailsFormContext);
  const { reverseCharge } = useContext(ReverseChargeContext);
  const { selectedImage } = useContext(ImageContext);
  const { logoSelectedImage } = useContext(LogoImageContext);
  const [placeReady, setPlaceReady] = useState(false);

  const placeOfSupply = rawPlaceOfSupply.toUpperCase();
  const placeOfDelivery = rawPlaceOfDelivery.toUpperCase();
  
  let subTotal=0, subTotalTaxAmount=0;

  // alert(selectedImage);
  useEffect(() => {
    const checkValues = () => {
      if (placeOfSupply !== '' && placeOfDelivery !== '' && items.length !== 0) {
        setPlaceReady(true);
      } else {
        if (placeOfDelivery !== '') {
          // alert(`${placeOfSupply}, ${placeOfDelivery}, ${items.length}`);
        }
        setTimeout(checkValues, 100); // Recheck after 100ms
      }
    };

    checkValues();
  }, [placeOfSupply, placeOfDelivery, items]);

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };


  const calculateNetAmount = () => {
    if (!placeReady) {
      return 'Calculating...'; // Return early if values are not ready
    }

    const taxRate = placeOfSupply === placeOfDelivery ? 0.09 : 0.18;

    let allItemsDetails = items.map((item, index) => {
      const itemTotal = (parseFloat(item.unitPrice) * parseInt(item.quantity)) - parseFloat(item.discount);
      let totalPrice, taxAmount, itemDetails;

      if (taxRate === 0.09) {
        const CGSTItemTax = itemTotal * 0.09;
        const SGSTItemTax = itemTotal * 0.09;
        taxAmount = CGSTItemTax + SGSTItemTax;
        totalPrice = itemTotal + taxAmount;
        subTotal = subTotal+totalPrice;
        subTotalTaxAmount = subTotalTaxAmount + taxAmount;

        itemDetails = [
          {
            index: index + 1,
            description: item.description,
            unitPrice: parseFloat(item.unitPrice).toFixed(2),
            quantity: parseInt(item.quantity),
            netAmount: itemTotal.toFixed(2),
            taxRate: '9%',
            taxType: 'CGST',
            taxAmount: CGSTItemTax.toFixed(2),
            totalAmount: '',
            subTotal:'',
          },
          {
            index: '',
            description: '',
            unitPrice: '',
            quantity: '',
            netAmount: '',
            taxRate: '9%',
            taxType: 'SGST',
            taxAmount: SGSTItemTax.toFixed(2),
            totalAmount: totalPrice.toFixed(2),
            // subTotal: subTotal.toFixed(2),
            // subTotalTaxAmount: subTotalTaxAmount.toFixed(2)
          }
        ];
      } else {
        const IGSTItemTax = itemTotal * taxRate;
        taxAmount = IGSTItemTax;
        totalPrice = itemTotal + taxAmount;
        subTotal = subTotal + totalPrice;
        subTotalTaxAmount = subTotalTaxAmount + taxAmount;

        itemDetails = [
          {
            index: index + 1,
            description: item.description,
            unitPrice: parseFloat(item.unitPrice).toFixed(2),
            quantity: parseInt(item.quantity),
            netAmount: itemTotal.toFixed(2),
            taxRate: (taxRate * 100).toFixed(2) + '%',
            taxType: 'IGST',
            taxAmount: taxAmount.toFixed(2),
            totalAmount: totalPrice.toFixed(2),
            // subTotal: subTotal.toFixed(2),
            // subTotalTaxAmount: subTotalTaxAmount.toFixed(2)
          }
        ];
      }

      return itemDetails;
    });

    // Flatten the array of arrays
    return allItemsDetails.flat();
  };

  const itemsDetails = calculateNetAmount();
  const roundedSubTotal = Math.round(subTotal);
  const subTotalInWords = capitalizeWords(num2words(roundedSubTotal.toFixed(0), { lang: 'en' }));

  return (
    <div className='final-invoice'>

        <div className='upper-box'>
          <div className='upper-inner-box1'>

            <div>
              <img src={logoSelectedImage} alt="Selected" style={{ width: '320px', height: '90px' }} />
            </div>

          </div>
          <div className='upper-inner-box2'>
            <h3>Tax Invoice/Bill of Supply/Cash Memo</h3>  
            <p>(Original for Recipient)</p>
          </div>
        </div>

        <div className='upper-box'>
          <div className='invoice-form-data upper-inner-box1'>
            <div className='invoice-form-box1'>
              <h4>Sold By:</h4>
              <p>{invoiceFormData.name}</p>
              <p>{invoiceFormData.address},{invoiceFormData.state},{invoiceFormData.city},{invoiceFormData.pincode}</p>
            </div>
            <div className='invoice-form-box2'>
              <p><span className='bolded-weight'>PAN No </span> : {invoiceFormData.pan}</p>
              <p><span className='bolded-weight'>GST No </span> : {invoiceFormData.gst}</p>
            </div>
          </div>
          <div className='billing-form-data upper-inner-box2'>
            <div className='billing-form-box1'>
              <h4>Billing Address:</h4>
              <p>{billingFormData.name}</p>
              <p>{billingFormData.address}</p>
              <p>{billingFormData.state},{billingFormData.city},{billingFormData.pincode}</p>
              <p><span className='bolded-weight'>State/UT Code:</span>{billingFormData.stateUTCode}</p>
            </div>
          </div>
        </div>

        <div className='upper-box mt-in-perc-6 '>
          <div className='shipping-form-data upper-inner-box1'>
            
          </div>
          <div className='shipping-form-data upper-inner-box2'>
            <div className='shipping-form-box1'>
              <h4>Shipping Address:</h4>
              <p>{shippingFormData.name}</p>
              <p>{shippingFormData.address}</p>
              <p>{shippingFormData.state},{shippingFormData.city},{shippingFormData.pincode}</p>
              <p><span className='bolded-weight'>State/UT Code:</span>{shippingFormData.stateUTCode}</p>
            </div>
          </div>
        </div>

        <div className='upper-box '>
          <div className='supply-delivery-form-data upper-inner-box1'>
            
          </div>
          <div className='supply-delivery-form-data upper-inner-box2'>
            <div className='supply-delivery-form-box1'>
              <p><span className='bolded-weight'>Place of supply:</span> {placeOfSupply}</p>
              <p><span className='bolded-weight'>place of delivery:</span> {placeOfDelivery}</p>
              
            </div>
          </div>
        </div>

        <div className='upper-box'>
          <div className='order-form-data upper-inner-box1'>
            <div className='order-form-box1'>
              
              <p><span className='bolded-weight'>Order Number : </span>{orderFormData.orderNumber}</p>
              <p><span className='bolded-weight'>Order Date : </span>{orderFormData.orderDate}</p>
            </div>
          </div>
          <div className='invoice-details-form-data upper-inner-box2'>
            <div className='invoice-details-form-box1'>
              <p><span className='bolded-weight'>Invoice Number : </span>{invoiceDetailsFormData.invoiceNumber}</p>
              <p><span className='bolded-weight'>Invoice Details : </span>{invoiceDetailsFormData.invoiceDetails}</p>
              <p><span className='bolded-weight'>Invoice Date : </span>{invoiceDetailsFormData.invoiceDate}</p>
            </div>
          </div>
        </div>




      
      
      {placeReady ? (
        <table className='table-border width-in-perc table-border-collapse'>
          <thead className='table-border-bottom'>
            <tr className='bg-lightgray'>
              <th className='table-border-right text-align-center'>Sl. No.</th>
              <th className='table-border-right text-align-center'>Item Description</th>
              <th className='table-border-right text-align-center'>Unit Price</th>
              <th className='table-border-right text-align-center'>Quantity</th>
              <th className='table-border-right text-align-center'>Net Amount</th>
              <th className='table-border-right text-align-center'>Tax Rate</th>
              <th className='table-border-right text-align-center'>Tax Type</th>
              <th className='table-border-right text-align-center'>Tax Amount</th>
              <th className='text-align-center'>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {itemsDetails.map((item, index) => (
              <React.Fragment key={index}>
              {item.index && index > 0 && itemsDetails[index - 1].index !== item.index && <tr><td className='table-border-top' colSpan="9"></td></tr>}
             
              <tr >
                
                <td className='table-border-right text-align-center'>{item.index}</td>
                <td className='table-border-right text-align-center'>{item.description}</td>
                <td className='table-border-right text-align-center'>{item.unitPrice}</td>
                <td className='table-border-right text-align-center'>{item.quantity}</td>
                <td className='table-border-right text-align-center'>{item.netAmount}</td>
                <td className='table-border-right text-align-center'>{item.taxRate}</td>
                <td className='table-border-right text-align-center'>{item.taxType}</td>
                <td className='table-border-right text-align-center'>{item.taxAmount}</td>
                <td className='text-align-center'>{item.totalAmount}</td>
              </tr>
              
              
              </React.Fragment>
            ))}
            <tr>
              <td colSpan={7} className='table-border-top bolded-weight'>Total:</td>
              <td className='table-border-top table-border-right table-border-left text-align-center'> { subTotalTaxAmount.toFixed(2) } </td>
              <td className='table-border-top text-align-center'> { subTotal.toFixed(2) }</td>
              
            </tr>
            <tr>
              <td className='table-border-top' colSpan={9}>
                <span className='bolded-weight'>Amount in Words: </span>
                
              </td>
              
            </tr>
            <tr>
              <td colSpan={9}>
                <span className='bolded-weight'>
                  {subTotalInWords}
                </span>
                </td>
            </tr>
            
            <tr className='text-align-end'>
              <td className='table-border-top' colSpan={9}>
                <span className='bolded-weight'>For {invoiceFormData.name}:</span>
                <div>
                  <img src={selectedImage} alt="Selected" style={{ width: '150px', height: '150px' }} />
                </div>
                <span className='bolded-weight'>Authorized Signatory</span>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Calculating...</p>
      )}
      <p>Whether tax is payable under reverse charge - {capitalizeWords(reverseCharge)}</p>



      
        

    </div>
  );
};

export default NetAmountCalculator;
