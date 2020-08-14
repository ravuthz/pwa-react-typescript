import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import DocumentListItem from './DocumentListItem';

const DocumentPlayList: React.FC<any> = ({ data, other }) => {
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (!data || data.length <= 0) {
      setSelected(null);
    }
    return () => {
      setSelected(null);
    };
  }, [data]);

  const renderGroupDocs = (group: any, title: string, display: string = 'list', onClick: any = null) => {

    const renderType = (document: any) => {
      if (document && document.link) {
        return document.link.endsWith('.pdf') ? 'iframe' : 'image';
      }
      return "";
    }

    const handleClick = (data: any) => {
      const type = renderType(data);
      return typeof onClick === 'function' ? onClick(data) : setSelected({ ...data, type });
    };

    return (
      <>
        {group && group.length > 0 && (
          <>
            <h3>{title}</h3>
            {group.map((doc: any) => (
              <>
                <DocumentListItem display={display} type={renderType(doc)} key={doc.id} data={doc} onClick={() => handleClick(doc)}/>
                <br/>
              </>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Row>
        <Col span={18}>
          {selected && (
            <DocumentListItem display="show" type={selected.type || 'image'} key={selected.id} data={selected}/>
          )}
        </Col>
        <Col span={6}>
          {data && (
            <Card className="scroll-container">
              <>{renderGroupDocs(data.ApplicantDoc, 'Applicant Photos/Documents')}</>
              <>{renderGroupDocs(data.CoApplicantDoc, 'Co-Borrower Photos/Documents')}</>
              <>{renderGroupDocs(data.GuaApplicantDoc, 'Guarantor Photos/Documents')}</>
              <>{renderGroupDocs(data.DocumentsFieldCheck, 'Field Documents')}</>
              <>{renderGroupDocs(data.ILoanDoc, 'Disburse Documents')}</>
              <>{renderGroupDocs(data.morakotDoc, 'Morakot Documents')}</>
              <>{renderGroupDocs(other, 'Other')}</>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
}

export default DocumentPlayList;