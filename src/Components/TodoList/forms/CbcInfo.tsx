import React from 'react';
import AppDescription from '../../Shared/AppDescription';
import { Button, Divider } from 'antd';

const newEnquiry = [
  {
    label: 'Your Account Ref',
    value: 'LC19110800043'
  },
  {
    label: 'Family Name',
    value: 'CHAMROEURN'
  },
  {
    label: 'First Name',
    value: 'MEY'
  },
  {
    label: 'Application Type',
    value: 'Primary'
  },
  {
    label: 'Enquiry Type',
    value: 'NEW'
  },
  {
    label: 'Enquiry Date',
    value: new Date().toDateString()
  },
  {
    label: 'Date Of Birth',
    value: '1977-03-05'
  },
  {
    label: 'Member',
    value: 'Commercial Bank'
  },
  {
    label: 'Product Type',
    value: 'Unsecured Credit Card'
  },
];

const newAddress = [
  {
    label: 'Your Account Ref',
    value: 'LC19110800043'
  },
  {
    label: 'Family Name',
    value: 'CHAMROEURN'
  },
  {
    label: 'First Name',
    value: 'MEACH'
  },
  {
    label: 'District',
    value: 'Pur SenChey'
  },
  {
    label: 'Village',
    value: 'Prey Tea 1'
  },
  {
    label: 'Date Of Birth',
    value: '1977-03-05'
  },
  {
    label: 'Province',
    value: 'Phnom Penh'
  },
  {
    label: 'Commune',
    value: 'Chaom Chau 1'
  },
  {
    label: 'Address',
    value: '#K2 15, GROUP 4, PHUM PREY PRING TBONG CHOAM CHAO POR'
  },
  {
    label: 'Lines',
    value: 'SENCHEY'
  },
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


const CbcInfo: React.FC = () => {
  return (
    <div>
      <AppDescription title="New Enquiry" content={newEnquiry} bordered={true} />
      <Divider/>
      <AppDescription title="New Address" content={newAddress} />
    </div>
  );
};

export default CbcInfo;