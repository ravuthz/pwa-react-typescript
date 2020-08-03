import React from 'react';
import { useAxiosGet } from '../../../../hooks/axios.hook';
import { useTodoCtx } from '../../../../context/todo';
import CustomerInfoDescription from './CustomerInfoDescription';

const CustomerInfo: React.FC = () => {
  const { selectedTodo } = useTodoCtx();
  // const [toggleEdit, setToggleEdit] = useState(false);
  const { result } = useAxiosGet('todo_list/getCustomerInfo/' + selectedTodo.loanID); // hak_kim
  return (
    <div>
      {/*<AppDescription title="Main Borrow Info" content={mainBorrowInfo} bordered={true}>*/}
      {/*  <br/>*/}
      {/*  <Button type="primary" onClick={() => setToggleEdit(!toggleEdit)}>Edit Phone & Address</Button>*/}
      {/*  {toggleEdit && <AddressForm onCancel={() => setToggleEdit(false)}/>}*/}
      {/*</AppDescription>*/}
      {/*<Divider/>*/}
      {/*<AppDescription title="Financial Info" content={financialInfo}/>*/}
      {/*<Divider/>*/}
      {/*<AppDescription title="Product" content={product}/>*/}
      <CustomerInfoDescription title="Main Borrow" {...result.mainBorrower} />
      <CustomerInfoDescription title="Co Borrow" {...result.coBorrower} />
      <CustomerInfoDescription title="Guarantor" {...result.guarantor} />
    </div>
  );
};

export default CustomerInfo;