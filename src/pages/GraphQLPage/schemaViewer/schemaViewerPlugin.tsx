import { useEffect, useState } from 'react';

import { ScrollArea } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { IconBrandGraphql } from '@tabler/icons-react';

import { GraphiQLPlugin } from '@graphiql/react';
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';

export const schemaViewerPlugin: GraphiQLPlugin = {
  title: 'Schema Viewer',
  icon: () => <IconBrandGraphql />,
  content: () => <SchemaViewer />,
};

const SchemaViewer = () => {
  const [schema, setSchema] = useState<string>('');

  useEffect(() => {
    init().then((sdlString) => {
      setSchema(sdlString);
    });
  }, []);

  const init = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_KEY,
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      },
    );

    const jsonData = await response.json();

    const graphqlSchemaObj = buildClientSchema(jsonData.data);

    const sdlString = printSchema(graphqlSchemaObj);

    return sdlString;
  };

  return (
    <ScrollArea style={{ height: '85vh' }}>
      <CodeHighlight key={schema} code={schema} language="graphql" />
    </ScrollArea>
  );
};
