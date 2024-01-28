import { useContext } from 'react';

import { Stack, Select, Fieldset, Text } from '@mantine/core';

import { AppContext } from '../../layouts/AppContext';

const options = [
  {
    value: 'codegen',
    label: 'codegen',
    url: import.meta.env.VITE_SUPABASE_URL as string,
    key: import.meta.env.VITE_SUPABASE_KEY as string,
  },
  {
    value: 'quopilot',
    label: 'quopilot',
    url: import.meta.env.VITE_SUPABASE_URL_2 as string,
    key: import.meta.env.VITE_SUPABASE_KEY_2 as string,
  },
];

export const OverviewPage = () => {
  const appCtx = useContext(AppContext);

  return (
    <Stack p="md">
      <Select
        data={options}
        label="Supabase URL"
        placeholder="Select an option"
        value={appCtx.supabaseName}
        onChange={(value) => {
          if (value === null) {
            return;
          }

          const option = options.find((option) => option.value === value);
          if (option === undefined) {
            return;
          }

          appCtx.setSupabaseName(option.value);
          appCtx.setSupabaseUrl(option.url);
          appCtx.setSupabaseKey(option.key);
        }}
      />

      <Fieldset legend="Supabase Info">
        <Text>{appCtx.supabaseName}</Text>
        <Text>{appCtx.supabaseUrl}</Text>
        <Text className="w-full truncate">{appCtx.supabaseKey}</Text>
      </Fieldset>
    </Stack>
  );
};
