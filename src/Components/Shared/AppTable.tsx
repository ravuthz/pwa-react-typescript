import React, { useState } from 'react';
import { Table } from 'antd';

const AppTable: React.FC<any> = ({ selectedKey = 'key', dataSource, columns, onRowClick, onRowDoubleClick, onRowSelectChange, ...props }: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const onChange = (keys: any) => {
    setSelectedRowKeys(keys);
    if (onRowSelectChange) {
      onRowSelectChange(keys);
    }
  }

  const onClick = (record: any, index: any) => {
    setSelectedRowKeys([record[selectedKey]]);
    if (onRowClick) {
      onRowClick(record, index);
    }
  }

  const onDoubleClick = (record: any, index: any) => {
    setSelectedRowKeys([record[selectedKey]]);
    if (onRowDoubleClick) {
      onRowDoubleClick(record, index);
    }
  }

  // const onRowChange = (pagination: any, filters: any, sorter: any) => {
  //   console.log('onRowChange: ', pagination, filters, sorter);
  // }

  return (
    <div>
      {/* onChange={onRowChange} */}
      <Table
        scroll={{ x: true }}
        onRow={(record: any, index: any) => {
          return {
            onClick: () => onClick(record, index),
            onDoubleClick: () => onDoubleClick(record, index),
            // onContextMenu: event => {},
            // onMouseEnter: event => {},
            // onMouseLeave: event => {}
          }
        }}
        rowSelection={{ type: 'radio', hideSelectAll: true, selectedRowKeys, onChange: onChange }}
        dataSource={dataSource}
        columns={columns}
        {...props}
      />;
    </div>
  );
};

export default AppTable;