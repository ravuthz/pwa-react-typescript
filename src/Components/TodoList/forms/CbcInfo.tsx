import React, { useEffect, useState } from 'react';
import AppDescription from '../../Shared/AppDescription';
import { Divider } from 'antd';
import { useAxiosGet } from '../../../hooks/axios.hook';
import { useTodoCtx } from '../../../context/todo';
import * as _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

numeral.defaultFormat('0,0.00');

const currency: any = {
  USD: '$',
  KHR: '៛',
  RIEL: '៛',
};

// LC19061100023
// LC19073100057

const identityInfo = {
  yourAccountRef: 'Your Account Ref',
  unformatedName: 'Unformatted Name',
  lastName: 'Family Name',
  firstName: 'First Name',
};

const defaultInfo = {
  ...identityInfo,
  dob: 'Date Of Birth',
  applicantType: 'Application Type',
  member: 'Member',
  productType: 'Product Type',
};

const newEnquiryKeys = {
  ...defaultInfo,
  enquiryType: 'Enquiry Type',
  enquiryDate: 'Enquiry Date',
};

const newAccountKeys = {
  ...defaultInfo,
  currency: 'Currency',
  originalAmount: 'Original Amount',
  openDate: 'Open Date'
};

const newAddressKeys = {
  ...identityInfo,
  provinceName: 'Province',
  districtName: 'District',
  communeName: 'Commune',
  villageName: 'Village',
  addressLine1: 'Address Lines'
};

const formatLabelValue = (keys: any, data: any) => {
  return _.map(keys, (label, key) => {
    let value = data[key];
    switch (key) {
      case 'dob':
      case 'enquiryDate':
      case 'openDate':
        value = value ? moment(value).format('YYYY-MM-DD') : '';
        break;
      case 'originalAmount':
        value = currency[data['currency']] + numeral(value).format();
        break;
    }
    return { label, value };
  });
}

const CbcInfo: React.FC = () => {
  const { selectedTodo } = useTodoCtx();
  const { result } = useAxiosGet('todo_list/getCbc/' + selectedTodo.loanID);

  const [newEnquiry, setNewEnquiry] = useState<any>([]);
  const [newAddress, setNewAddress] = useState<any>([]);
  const [newAccount, setNewAccount] = useState<any>([]);

  useEffect(() => {
    if (result) {
      const { dmh_enquiry, dmh_account, dmh_address } = result;
      if (dmh_enquiry) {
        setNewEnquiry(formatLabelValue(newEnquiryKeys, dmh_enquiry));
      }
      if (dmh_address) {
        setNewAddress(formatLabelValue(newAddressKeys, dmh_address));
      }
      if (dmh_account) {
        setNewAccount(formatLabelValue(newAccountKeys, dmh_account));
      }
    }
  }, [result]);

  return (
    <div>
      {(newEnquiry && newEnquiry.length > 0) && (
        <React.Fragment>
          <AppDescription title="New Enquiry" content={newEnquiry} bordered={true}/>
          <Divider/>
        </React.Fragment>
      )}

      {(newAddress && newAddress.length > 0) && (
        <React.Fragment>
          <AppDescription title="New Address" content={newAddress}/>
          <Divider/>
        </React.Fragment>
      )}

      {(newAccount && newAccount.length > 0) && (
        <AppDescription title="New Account" content={newAccount}/>
      )}
    </div>
  );
};

export default CbcInfo;