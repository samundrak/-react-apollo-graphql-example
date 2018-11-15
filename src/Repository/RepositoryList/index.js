import React from 'react';
import RepositoryItem from '../RepositoryItem';

const RepositoryList = ({ repositories }) => {
  return repositories.edges.map(({ node }) => {
    return (
      <div key={node.id}>
        <div key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />
        </div>
      </div>
    );
  });
};
export default RepositoryList;
