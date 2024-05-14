import React from 'react';
import { WebView } from 'react-native-webview';

const RedsysWebView = ({ redsysParams }) => {
  const htmlContent = `
    <html>
      <body onload="document.forms[0].submit()">
        <form action="https://sis-t.redsys.es:25443/sis/realizarPago" method="post">
          <input type="hidden" name="Ds_SignatureVersion" value="${redsysParams.Ds_SignatureVersion}">
          <input type="hidden" name="Ds_MerchantParameters" value="${redsysParams.Ds_MerchantParameters}">
          <input type="hidden" name="Ds_Signature" value="${redsysParams.Ds_Signature}">
        </form>
      </body>
    </html>
  `;

  return <WebView originWhitelist={['*']} source={{ html: htmlContent }} />;
};

export default RedsysWebView;