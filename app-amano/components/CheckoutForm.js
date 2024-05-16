import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, Modal, TextInput, Alert } from 'react-native';
import { makePayment } from '../services/payment';
import swal from 'sweetalert2';
import { useNavigation } from '@react-navigation/native';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';




const CheckoutForm = ({pedido}) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setProcessing(true);

    const { paymentMethod, error } = await stripe?.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
      });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
        // Aquí enviar el token a tu servidor para procesar el pago
        console.log(paymentMethod);
        // Ejemplo: enviarToken(token);
        makePayment(paymentMethod, pedido).then((data) => {
            localStorage.removeItem('carrito')
            // Para este ejemplo, simulamos el proceso con una alerta
            swal.fire({
                icon: 'success',
                title: data.message,
                timer: 5000
            });
            navigate.navigate("Mi perfil")
        })
        .catch((error) => {
            setProcessing(false)
            swal.fire({
                icon: 'error',
                title: error,
                timer: 4000
            });
        }).finally(() => { setProcessing(false) }); 
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    // Otros opciones de configuración
  };
  return (
    <div style={styles.checkoutForm}>
      <h2 style={styles.heading}>Checkout</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Card details
            </label>
            <div style={styles.cardElement}>
              <div className="card-entry">
                <CardNumberElement options={cardElementOptions} />
              </div>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
                Expiry Date
              </label>
              <div style={styles.cardElement}>
                <div className="card-entry">
                  <CardExpiryElement options={cardElementOptions} />
                </div>
            </div>
          </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                CVV
              </label>
              <div style={styles.cardElement}>
                <div className="card-entry">
                  <CardCvcElement options={cardElementOptions} />
                </div>
              </div>
            </div>
          {error && <div style={styles.errorMessage}>{error}</div>}
        <button type="submit" style={styles.submitButton} disabled={processing}>
          {processing ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
  
};

const styles = {
    checkoutForm: {
      width: '90%',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    form: {
      width: '90%',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    cardElement: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
    },
    errorMessage: {
      color: '#ff0000',
      fontSize: '14px',
      marginTop: '5px',
    },
    submitButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

export default CheckoutForm;