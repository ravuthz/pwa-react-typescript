import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import AppDescription from '../../../Shared/AppDescription';
import { Divider } from 'antd';

const customerInfoKeys = {
  fullName: 'Full Name',
  fullNameInKhmer: 'Full Name In Khmer',
  maritalStatus: 'Marital Status',
  gender: 'Gender',
  phoneLine: 'Phone Line 1',
  placeOfBirthAddress: 'Place of birth address',
  livingAddress: 'Living address',
  permanentAddress: 'Permanent address'
};

const financeInfoKeys = {
  employerName: 'Employer Info',
  sector: 'Sector',
  totalMonthlyIncome: 'Total Monthly Income',
  workingInfo: 'Working Info'
};

const productInfoKeys = {
  productType: "Production Type",
  category: "Product",
  totalLoan: "Total Loan",
  downPayment: "Down Payment",
  totalMonthlyInstall: "Total Monthly Install",
  loanTerm: "Loan Term",
  price: "Price",
  interestRate: "Interest Rate",
  color: "Color",
  model: "Model",
  year: "Year"
};

const formatLabelValue = (keys: any, data: any) => {
  return _.map(keys, (label, key) => {
    let value = data[key];
    // switch (key) {
    //   case 'dob':
    //   case 'enquiryDate':
    //   case 'openDate':
    //     value = value ? moment(value).format('YYYY-MM-DD') : '';
    //     break;
    //   case 'originalAmount':
    //     value = currency[data['currency']] + numeral(value).format();
    //     break;
    // }
    return { label, value };
  });
}

const CustomerInfoDescription: React.FC = (props: any) => {
  const [customerInfo, setCustomerInfo] = useState();
  const [financeInfo, setFinanceInfo] = useState();
  const [productInfo, setProductInfo] = useState();

  useEffect(() => {
    if (props) {
      if (props.customerInfo) {
        setCustomerInfo(formatLabelValue(customerInfoKeys, props.customerInfo));
      }
      if (props.financeInfo) {
        setFinanceInfo(formatLabelValue(financeInfoKeys, props.financeInfo));
      }
      if (props.productInfo) {
        setProductInfo(formatLabelValue(productInfoKeys, props.productInfo));
      }
    }
  }, [props]);
  return (
    <React.Fragment>
      {customerInfo && (
        <AppDescription title={props.title} content={customerInfo} bordered={true}>
          <br/>
          <Divider/>
        </AppDescription>
      )}

      {financeInfo && (
        <AppDescription title="Financial Info" content={financeInfo}>
          <Divider/>
        </AppDescription>
      )}

      {productInfo && <AppDescription title="Product Info" content={productInfo}/>}
    </React.Fragment>
  );
};

export default CustomerInfoDescription;