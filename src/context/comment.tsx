import React, { useState } from 'react';

const CommentContext = React.createContext({});

export const CommentProvider = (props: any) => {
  const [selectedComment, setSelectedComment] = useState({});
  const value = {
    selectedComment,
    setSelectedComment
  };
  return <CommentContext.Provider value={value} {...props} />;
}

export const useCommentCtx: any = () => React.useContext(CommentContext);