import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

function Payment() {
  const navigate = useNavigate();
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientID: 'AefVrXmMDnZFPhlNbti2Mw1ZZwhNjymDC2ikJYPesayk4jprJ0qaj9UmlTwhDMsYguCBoMVjJ_zyyxBB',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    Layout: 'vertical',
    shape: 'rect',
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  const handlePaymentSuccess = (data) => {
    console.log('sucess');
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      navigate('/checkout/success');
    }
  };
  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          value: handleSumTotal(),
        },
      },
    ],
  });
  const onApprove = (data, actions) => actions.order.capture().then((data) => {
    handlePaymentSuccess(data);
  });

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del Pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key="item.title">
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>
                $
                {' '}
                {item.price}
              </span>
            </div>
          </div>
        ))}
        <div className="Payment-item">
          <h3>Total:</h3>
          <span>
            <strong>
              $
              {' '}
              {handleSumTotal()}
            </strong>
          </span>
        </div>
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            // eslint-disable-next-line no-console
            onError={(error) => console.log(error)}
            // eslint-disable-next-line no-console
            onCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;
