import React, {useEffect, useState} from 'react';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51PGob9FFZqdYKyWkpKfKyTv4CcsR9CDBMVr4zk6Rne0FHHOd4Dm1SyWsGBmR6OgMHTjIN5NqDNMibrFk8LMPhwF4002MtY1Axh')

const RedsysWebView = ({ pedido}) => {

  return (
    <Elements stripe={stripePromise} >
      <CheckoutForm pedido={pedido}/>
    </Elements>
  );

};

export default RedsysWebView;