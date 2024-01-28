import { Stack, Title, Table, Card } from '@mantine/core';

import type { TableInfo } from './tableType';

export const TablePanel = ({ data }: { data: TableInfo }) => {
  return (
    <Stack>
      {data.map((table, index) => {
        return (
          <Card key={index} withBorder>
            <Stack>
              <Title order={3}>{table.table}</Title>

              <Table striped withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Column</Table.Th>
                    <Table.Th>Type</Table.Th>
                    <Table.Th>Format</Table.Th>
                    <Table.Th>Required</Table.Th>
                    <Table.Th>Default</Table.Th>
                    <Table.Th>PK</Table.Th>
                    <Table.Th>FK</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {table.value.map((column, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{column.column}</Table.Td>
                      <Table.Td>{column.value.type}</Table.Td>
                      <Table.Td>{column.value.format}</Table.Td>
                      <Table.Td>{column.value.required ? 'true' : ''}</Table.Td>
                      <Table.Td>{column.value.default}</Table.Td>
                      <Table.Td>{column.value.pk ? 'true' : ''}</Table.Td>
                      <Table.Td>{column.value.fk}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
};
