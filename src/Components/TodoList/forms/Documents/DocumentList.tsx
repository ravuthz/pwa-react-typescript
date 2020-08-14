import React from 'react';
import { Card, Col, Row } from 'antd';
import DocumentListItem from './DocumentListItem';

const DocumentList: React.FC<any> = ({ data, other }) => {

  const renderGroupDocs = (group: any, title: string, display: string = 'list', onClick: any = null) => {

    const renderType = (document: any) => {
      if (document && document.link) {
        return document.link.endsWith('.pdf') ? 'iframe' : 'image';
      }
      return "";
    }

    return (
      <>
        {group && group.length > 0 && (
          <>
            <h3>{title}</h3>
            {group.map((doc: any) => (
              <>
                <DocumentListItem rotate={true} type={renderType(doc)} display="show" key={doc.id} data={doc}/>
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
        <Col span={24}>
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

export default DocumentList;