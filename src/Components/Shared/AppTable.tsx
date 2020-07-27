import React, { useState } from 'react';
import { Table } from 'antd';

const AppTable: React.FC<any> = ({ dataSource, columns, onRowClick, onRowDoubleClick, onRowSelectChange }: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const onChange = (keys: any) => {
    setSelectedRowKeys(keys);
    if (onRowSelectChange) {
      onRowSelectChange(keys);
    }
  }

  const onClick = (record: any, index: any) => {
    setSelectedRowKeys([record.key]);
    if (onRowClick) {
      onRowClick(record, index);
    }
  }

  const onDoubleClick = (record: any, index: any) => {
    setSelectedRowKeys([record.key]);
    if (onRowDoubleClick) {
      onRowDoubleClick(record, index);
    }
  }

  return (
    <div>
      <Table
        onRow={(record: any, index: any) => {
          return {
            onClick: () => onClick(record, index),
            onDoubleClick: () => onDoubleClick(record, index),
            // onContextMenu: event => {},
            // onMouseEnter: event => {},
            // onMouseLeave: event => {}
          }
        }}
        rowSelection={{ selectedRowKeys, onChange: onChange }}
        dataSource={dataSource} columns={columns}/>;
    </div>
  );
};

export default AppTable;