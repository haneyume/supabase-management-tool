import { useState, useEffect } from 'react';

import { CodeHighlight } from '@mantine/code-highlight';

import type { TableInfo } from './tableType';

export const RLSPanel = ({ data }: { data: TableInfo }) => {
  const [str, setStr] = useState<string>('');

  useEffect(() => {
    setStr(genRLSCode());
  }, [data]);

  const genRLSCode = () => {
    let res = '';

    for (let i = 0; i < data.length; i++) {
      const table = data[i].table;

      res += templateCode.replace(/__TABLE__/g, table);
    }

    return res;
  };

  return <CodeHighlight key={str} code={str} language="sql" />;
};

const templateCode = `
ALTER TABLE public.__TABLE__ ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select data for __TABLE__."
  ON public.__TABLE__ 
  FOR SELECT
  TO authenticated
  USING ( TRUE );

CREATE POLICY "Users can insert data for __TABLE__."
  ON public.__TABLE__ 
  FOR INSERT
  TO authenticated
  WITH CHECK ( TRUE );

CREATE POLICY "Users can update data for __TABLE__."
  ON public.__TABLE__ 
  FOR UPDATE
  TO authenticated
  USING ( TRUE );

CREATE POLICY "Users can delete data for __TABLE__."
  ON public.__TABLE__ 
  FOR DELETE
  TO authenticated
  USING ( TRUE );

`;
