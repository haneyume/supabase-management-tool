import { useState } from 'react';

import { Stack, Title, Button, Tabs } from '@mantine/core';

import axios from 'axios';

import type { TableInfo } from './tableType';

import { TablePanel } from './TablePanel';
import { RLSPanel } from './RLSPanel';
import { RTKApiPanel } from './RTKApiPanel';

export const SupabaseEditor = ({
  supabaseUrl,
  supabaseKey,
}: {
  supabaseUrl: string;
  supabaseKey: string;
}) => {
  const [data, setData] = useState<TableInfo>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData: () => Promise<TableInfo> = async () => {
    const result = await axios.get(
      `${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`,
    );

    const definitions = Object.entries(result.data.definitions);

    let _data = definitions.map(([table, value]: [string, any]) => {
      return { table, value };
    });

    for (let i = 0; i < _data.length; i++) {
      const properties = Object.entries(_data[i].value.properties);

      let _value = properties.map(([column, value]: [string, any]) => {
        if (_data[i].value.required.includes(column)) {
          value.required = true;
        }

        if (value.description?.includes('<pk/>')) {
          value.pk = true;
        }

        if (value.description?.includes('<fk')) {
          const reference = value.description.match(
            /<fk table='(.+?)' column='(.+?)'\/>/,
          );

          if (reference) {
            const table = reference[1];
            const column = reference[2];

            value.fk = `${table}.${column}`;
          }
        }

        // value.description = undefined;

        return { column, value };
      });

      _data[i].value = _value;
    }

    _data = _data.filter((item) => item.table !== '_prisma_migrations');
    _data = _data.filter((item) => item.table.startsWith('_') === false);
    _data = _data.sort((a, b) => a.table.localeCompare(b.table));

    return _data;
  };

  return (
    <Stack p="md">
      <Title order={3}>Supabase Tables</Title>

      <Button
        loading={loading}
        onClick={async () => {
          setLoading(true);
          const res = await fetchData();
          setData(res);
          setLoading(false);
        }}
      >
        Fetch
      </Button>

      <Tabs defaultValue="0" p="md">
        <Tabs.List>
          <Tabs.Tab value="0">Tables</Tabs.Tab>
          <Tabs.Tab value="1">RLS</Tabs.Tab>
          <Tabs.Tab value="2">RTKApi</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="0" pt="xs">
          <TablePanel data={data} />
        </Tabs.Panel>

        <Tabs.Panel value="1" pt="xs">
          <RLSPanel data={data} />
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="xs">
          <RTKApiPanel data={data} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
