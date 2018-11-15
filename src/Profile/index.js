import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const Profile = () => {
  return (
    <Query query={GET_CURRENT_USER}>
      {({ data, loading }) => {
        const { viewer } = data;
        if (loading || !viewer) {
          return <div>Loading ...</div>;
        }
        return (
          <div>
            {viewer.name} {viewer.login}
          </div>
        );
      }}
    </Query>
  );
};
export default Profile;
