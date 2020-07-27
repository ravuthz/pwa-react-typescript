import React from 'react';
import AppDescription from '../../Shared/AppDescription';
import { Divider } from 'antd';
import { useAxiosGet } from '../../../hooks/axios.hook';

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

const CbcInfo: React.FC = () => {
  const { result } = useAxiosGet('todo_list/getCbc/LC19092300001');
  console.log('result: ', result);

  return (
    <div>
      <AppDescription title="New Enquiry" content={newEnquiry} bordered={true}/>
      <Divider/>
      <AppDescription title="New Address" content={newAddress}/>
    </div>
  );
};

export default CbcInfo;