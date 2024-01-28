import { useContext } from 'react';

import { GraphQLEditor } from './GraphQLEditor';

import { AppContext } from '../../layouts/AppContext';

export const GraphQLPage = () => {
  const appCtx = useContext(AppContext);

  return (
    <GraphQLEditor
      supabaseUrl={appCtx.supabaseUrl}
      supabaseKey={appCtx.supabaseKey}
    />
  );
};
