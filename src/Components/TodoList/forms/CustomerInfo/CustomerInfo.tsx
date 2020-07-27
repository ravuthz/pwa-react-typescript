import React, { useState } from 'react';
import AppDescription from '../../../Shared/AppDescription';
import { Button, Divider } from 'antd';
import AddressForm from './AddressForm';

const mainBorrowInfo = [
  {
    label: 'Full Name',
    value: 'Song Vuthy'
  },
  {
    label: 'Full Name In Khmer',
    value: 'Song Vuthy'
  },
  {
    label: 'Marital Status',
    value: 'Married'
  },
  {
    label: 'Gender',
    value: 'Male'
  },
  {
    label: 'Phone Line 1',
    value: '070304077'
  },
  {
    label: 'Place of birth address',
    value: 'N/A ... Full real address will be place here ... now just long test :D :D for test length, N/A ... Full real address will be place here ... now just long test :D :D for test length'
  },
  {
    label: 'Living address',
    value: 'N/A ... Full real address will be place here ... now just long test :D :D for test length'
  }
];

const financialInfo = [
  {
    label: 'Employer Info',
    value: 'Sell age'
  },
  {
    label: 'Sector',
    value: 'Trade and Ecommerce'
  },
  {
    label: 'Total Monthly Income',
    value: '$350'
  },
  {
    label: 'Working Info',
    value: 'N/A, ទួលគោក, ទួលគោក, ភ្នំពេញ'
  }
];

const product = [
  {
    label: 'Product type',
    value: 'Electronic'
  },
  {
    label: 'Product',
    value: 'Computer MSI'
  },
  {
    label: 'Total Loan',
    value: '$700'
  },
  {
    label: 'Down Payment',
    value: '$0'
  },
  {
    label: 'Total Monthly Installment',
    value: '$71'
  },
  {
    label: 'Loan Term',
    value: '12'
  },
  {
    label: 'Price',
    value: '$700'
  },
];

const CustomerInfo: React.FC = () => {
  const [toggleEdit, setToggleEdit] = useState(false);
  return (
    <div>
      <AppDescription title="Main Borrow Info" content={mainBorrowInfo} bordered={true}>
        <br/>
        <Button type="primary" onClick={() => setToggleEdit(!toggleEdit)}>Edit Phone & Address</Button>
        {toggleEdit && <AddressForm onCancel={() => setToggleEdit(false)}/>}
      </AppDescription>
      <Divider/>
      <AppDescription title="Financial Info" content={financialInfo}/>
      <Divider/>
      <AppDescription title="Product" content={product}/>


    </div>
  );
};

export default CustomerInfo;