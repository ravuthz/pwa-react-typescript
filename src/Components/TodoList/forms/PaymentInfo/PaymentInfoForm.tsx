import React from 'react';
import AppDescription from '../../../Shared/AppDescription';
import * as _ from 'lodash';

const paymentInfoKeys = {
  monthlyInstallment: "Monthly Installment",
  paidAmount: "Paid Amount",
  remainingAmount: "Remaining Amount",
  planCollect: "Plan to Collect",
  totalPenalty: "Total Penalty",
  remainingInstallment: "Remaining Installment",
  status: "Status",
  // remainAmount: "",
  // totalMonthlyWithPenalty: "",
};

const formatLabelValue = (keys: any, data: any) => {
  return _.map(keys, (label, key) => {
    let value = data[key];
    return { label, value };
  });
}

const PaymentInfoForm: React.FC<any> = ({ data }) => {
  return (
    <div>
      <AppDescription content={formatLabelValue(paymentInfoKeys, data)} bordered={true}>
      </AppDescription>
    </div>
  );
};

export default PaymentInfoForm;