import { useState, useEffect } from 'react';

import { CodeHighlight } from '@mantine/code-highlight';

import type { TableInfo } from './tableType';

export const RTKApiPanel = ({ data }: { data: TableInfo }) => {
  const [str, setStr] = useState<string>('');

  useEffect(() => {
    setStr(genRTKApiCode());
  }, [data]);

  const genRTKApiCode = () => {
    let typeCodeRes = '';
    for (let i = 0; i < data.length; i++) {
      const table = data[i].table;

      typeCodeRes += typeCodeTemplate.replace(/__TABLE__/g, table);
    }

    let typeExportCodeRes = '';
    for (let i = 0; i < data.length; i++) {
      const table = data[i].table;

      typeExportCodeRes += typeExportCodeTemplate.replace(/__TABLE__/g, table);
    }

    let apiCodeRes = '';
    for (let i = 0; i < data.length; i++) {
      const table = data[i].table;
      const tableCamel = capitalizeFirstLetter(snakeToCamel(table));
      const tableCamelSingular = capitalizeFirstLetter(
        singularize(snakeToCamel(table)),
      );

      apiCodeRes += apiCodeTemplate
        .replace(/__TABLE__/g, table)
        .replace(/__TABLE_CAMEL_C__/g, tableCamel)
        .replace(/__TABLE_CAMEL_SINGULAR_C__/g, tableCamelSingular);
    }

    let hookExportCodeRes = '';
    for (let i = 0; i < data.length; i++) {
      const table = data[i].table;
      const tableCamel = capitalizeFirstLetter(snakeToCamel(table));
      const tableCamelSingular = capitalizeFirstLetter(
        singularize(snakeToCamel(table)),
      );

      hookExportCodeRes += exportCodeTemplate
        .replace(/__TABLE__/g, table)
        .replace(/__TABLE_CAMEL_C__/g, tableCamel)
        .replace(/__TABLE_CAMEL_SINGULAR_C__/g, tableCamelSingular);
    }

    let res = templateCode
      .replace(
        /__ALL_TABLES__/g,
        data.map((item) => `'${item.table}'`).join(', '),
      )
      .replace(/__TYPES__/g, typeCodeRes)
      .replace(/__TYPE_EXPORTS__/g, typeExportCodeRes)
      .replace(/__APIS__/g, apiCodeRes)
      .replace(/__HOOK_EXPORTS__/g, hookExportCodeRes);

    return res;
  };

  return <CodeHighlight key={str} code={str} language="tsx" />;
};

const templateCode = `import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { supabase } from '@/utils/supabase';
import type { Database } from '@/utils/supabase_type';

type filter<T> =
  | {
      operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'ilike' | 'neq';
      column: keyof T;
      value: string | number | boolean;
    }
  | {
      operator: 'is';
      column: keyof T;
      value: null;
    }
  | {
      operator: 'in' | 'cs' | 'cd';
      column: keyof T;
      value: string[];
    };

type order<T> = {
  column: keyof T;
  ascending: boolean;
};

__TYPES__

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: [__ALL_TABLES__],
  endpoints: (builder) => ({
__APIS__
  }),
});

export const {
__HOOK_EXPORTS__
} = supabaseApi;

export type {
__TYPE_EXPORTS__
};

export type { filter, order };
`;

const typeCodeTemplate = `// __TABLE__
type __TABLE___row = Database['public']['Tables']['__TABLE__']['Row'];
type __TABLE___insert = Database['public']['Tables']['__TABLE__']['Insert'];
type __TABLE___update = Database['public']['Tables']['__TABLE__']['Update'];
`;

const typeExportCodeTemplate = `  // __TABLE__
  __TABLE___row,
  __TABLE___insert,
  __TABLE___update,
`;

const apiCodeTemplate = `
    get__TABLE_CAMEL_C__: builder.query<
      __TABLE___row[],
      { offset?: number; limit?: number; filter?: filter<__TABLE___row>[]; order?: order<__TABLE___row>[] }
    >({
      queryFn: async (arg) => {
        const queryBuilder = supabase.from('__TABLE__').select('*');

        if (arg.filter) {
          arg.filter.forEach((filter) => {
            queryBuilder.filter(filter.column, filter.operator, filter.value);
          });
        }

        if (arg.order) {
          arg.order.forEach((order) => {
            queryBuilder.order(order.column, { ascending: order.ascending });
          });
        }

        if (arg.offset) {
          const offset = arg.offset || 0;
          const limit = arg.limit || 10;

          queryBuilder.range(offset, offset + limit - 1);
        }

        if (arg.limit) {
          queryBuilder.limit(arg.limit || 10);
        }

        const { data, error } = await queryBuilder;

        if (error) {
          return { error };
        } else {
          return { data: data };
        }
      },
      providesTags: ['__TABLE__'],
    }),
    get__TABLE_CAMEL_SINGULAR_C__: builder.query<
      __TABLE___row,
      { id: string }
    >({
      queryFn: async (arg) => {
        const { data, error } = await supabase
          .from('__TABLE__')
          .select('*')
          .eq('id', arg.id)
          .single();

        if (error) {
          return { error };
        } else {
          return { data: data };
        }
      },
      providesTags: ['__TABLE__'],
    }),
    create__TABLE_CAMEL_SINGULAR_C__: builder.mutation<
      void, __TABLE___insert
    >({
      queryFn: async (arg) => {
        const { error } = await supabase
          .from('__TABLE__')
          .insert([arg]);

        if (error) {
          return { error };
        } else {
          return { data: undefined };
        }
      },
      invalidatesTags: ['__TABLE__'],
    }),
    upsert__TABLE_CAMEL_SINGULAR_C__: builder.mutation<
      void, __TABLE___insert
    >({
      queryFn: async (arg) => {
        const { error } = await supabase
          .from('__TABLE__')
          .upsert([arg]);

        if (error) {
          return { error };
        } else {
          return { data: undefined };
        }
      },
      invalidatesTags: ['__TABLE__'],
    }),
    update__TABLE_CAMEL_SINGULAR_C__: builder.mutation<
      void, __TABLE___update & { id: string }
    >({
      queryFn: async (arg) => {
        const { error } = await supabase
          .from('__TABLE__')
          .update(arg)
          .eq('id', arg.id);

        if (error) {
          return { error };
        } else {
          return { data: undefined };
        }
      },
      invalidatesTags: ['__TABLE__'],
    }),
    delete__TABLE_CAMEL_SINGULAR_C__: builder.mutation<
      void, { id: string }
    >({
      queryFn: async (arg) => {
        const { error } = await supabase
          .from('__TABLE__')
          .delete()
          .eq('id', arg.id);

        if (error) {
          return { error };
        } else {
          return { data: undefined };
        }
      },
      invalidatesTags: ['__TABLE__'],
    }),
    refetch__TABLE_CAMEL_SINGULAR_C__: builder.mutation<
      void, void
    >({
      queryFn: async () => {
        return { data: undefined };
      },
      invalidatesTags: ['__TABLE__'],
    }),
`;

const exportCodeTemplate = `  // __TABLE__
  useGet__TABLE_CAMEL_C__Query,
  useGet__TABLE_CAMEL_SINGULAR_C__Query,
  useCreate__TABLE_CAMEL_SINGULAR_C__Mutation,
  useUpsert__TABLE_CAMEL_SINGULAR_C__Mutation,
  useUpdate__TABLE_CAMEL_SINGULAR_C__Mutation,
  useDelete__TABLE_CAMEL_SINGULAR_C__Mutation,
  useRefetch__TABLE_CAMEL_SINGULAR_C__Mutation,
`;

function singularize(word: string) {
  const endings: Record<string, string> = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: 'ze',
    ses: 's',
    es: 'e',
    s: '',
  };

  return word.replace(
    new RegExp(`(${Object.keys(endings).join('|')})$`),
    (r) => endings[r],
  );
}

function snakeToCamel(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );
}

function capitalizeFirstLetter(value: string) {
  if (!value) {
    return '';
  }

  return value[0].toUpperCase() + value.slice(1);
}
