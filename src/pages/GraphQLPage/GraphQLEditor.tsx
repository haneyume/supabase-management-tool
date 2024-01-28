import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import { explorerPlugin } from '@graphiql/plugin-explorer';
import { schemaViewerPlugin } from './schemaViewer/schemaViewerPlugin';

import 'graphiql/graphiql.css';
import '@graphiql/plugin-explorer/dist/style.css';

const explorer = explorerPlugin({
  showAttribution: true,
});

export const GraphQLEditor = ({
  supabaseUrl,
  supabaseKey,
}: {
  supabaseUrl: string;
  supabaseKey: string;
}) => {
  const fetcher = createGraphiQLFetcher({
    url: `${supabaseUrl}/graphql/v1`,
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      apikey: supabaseKey,
    },
  });

  return (
    <div style={{ height: 'calc(100vh - 70px - 40px)' }}>
      <GraphiQL fetcher={fetcher} plugins={[explorer, schemaViewerPlugin]}>
        <GraphiQL.Logo>Supabase GraphQL</GraphiQL.Logo>
      </GraphiQL>
    </div>
  );
};
