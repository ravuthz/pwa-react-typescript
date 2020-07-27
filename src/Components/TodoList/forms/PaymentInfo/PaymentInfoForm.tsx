import React from 'react';
import AppDescription from '../../../Shared/AppDescription';

const paymentInfo = [
  {
    label: 'Monthly Installment',
    value: '71.00'
  },
  {
    label: 'Paid Amount',
    value: '71.00'
  },
  {
    label: 'Remaining Amount',
    value: '0.30'
  },
  {
    label: 'Plan to Collect',
    value: '71.30'
  },
  {
    label: 'Total Penalty',
    value: '0.50'
  },
  {
    label: 'Remaining Installment',
    value: '0'
  },
  {
    label: 'Status',
    value: 'D0'
  },
];

const PaymentInfoForm: React.FC = () => {

  return (
    <div>
      <AppDescription content={paymentInfo} bordered={true}>
      </AppDescription>
    </div>
  );
};

export default PaymentInfoForm;