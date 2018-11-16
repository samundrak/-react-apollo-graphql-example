import React, { Fragment } from 'react';
import RepositoryItem from '../RepositoryItem';
import Loading from '../../Loading';
import FetchMore from '../../FetchMore';
import Issues from '../../Issue';

const getUpdateQuery = entry => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }
  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};

const RepositoryList = ({ repositories, loading, fetchMore, entry }) => {
  return (
    <Fragment>
      {repositories.edges.map(({ node }) => {
        return (
          <div key={node.id}>
            <div key={node.id} className="RepositoryItem">
              <RepositoryItem {...node} />
              <Issues
                repositoryName={node.name}
                repositoryOwner={node.owner.login}
              />
            </div>
          </div>
        );
      })}
      <FetchMore
        loading={loading}
        hasNextPage={repositories.pageInfo.hasNextPage}
        variables={{
          cursor: repositories.pageInfo.endCursor,
        }}
        updateQuery={getUpdateQuery(entry)}
        fetchMore={fetchMore}
      >
        Repositories
      </FetchMore>
    </Fragment>
  );
};
export default RepositoryList;
