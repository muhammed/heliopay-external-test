import React, { useEffect, useState } from 'react';
import {
  ErrorPaymentEvent,
  HelioPay,
  PendingPaymentEvent,
  SuccessPaymentEvent,
  HelioApiAdapter,
} from '@heliofi/react';
import { Cluster } from '@solana/web3.js';

import './styles/style.scss';

const App = () => {
  const [paymentId, setPaymentId] = useState<string | null>(
    '634d3c5c14052fbca3893802'
  );
  const [cluster, setCluster] = useState<Cluster>('devnet');

  const getListCurrencies = () => {
    HelioApiAdapter.listCurrencies(cluster)
      .then((res) => {
        // console.log(2, res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    getListCurrencies();
  }, []);

  return (
    <>
      <input
        type="text"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />
      <br />
      <br />
      <div>
        <label>
          <input
            type="radio"
            name="cluster"
            value="devnet"
            checked={cluster === 'devnet'}
            onChange={() => setCluster('devnet')}
          />
          &nbsp; devnet
        </label>
        &nbsp;&nbsp;&nbsp;
        <label>
          <input
            type="radio"
            name="cluster"
            value="mainnet-beta"
            checked={cluster === 'mainnet-beta'}
            onChange={() => setCluster('mainnet-beta')}
          />
          &nbsp; mainnet-beta
        </label>
      </div>
      <br />
      <HelioPay
        cluster="devnet"
        paymentRequestId={paymentId}
        onSuccess={function (event: SuccessPaymentEvent): void {
          console.log('onSuccess', event);
        }}
        onError={function (event: ErrorPaymentEvent): void {
          console.log('onError', event);
        }}
        onPending={function (event: PendingPaymentEvent): void {
          console.log('onPending', event);
        }}
        onStartPayment={function (): void {
          console.log('onStartPayment');
        }}
        supportedCurrencies={['USDC']}
        totalAmount={0.145}
      />
    </>
  );
};

export default App;
