import { useContext } from 'react';

import { SupabaseEditor } from './SupabaseEditor/SupabaseEditor';

import { AppContext } from '../../layouts/AppContext';

export const RLSPage = () => {
  const appCtx = useContext(AppContext);

  return (
    <SupabaseEditor
      supabaseUrl={appCtx.supabaseUrl}
      supabaseKey={appCtx.supabaseKey}
    />
  );
};
