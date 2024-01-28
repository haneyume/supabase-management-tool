type TableInfo = Array<{
  table: string;
  value: Array<{
    column: string;
    value: {
      type: string;
      format: string;
      required?: boolean;
      default?: string;
      description?: string;
      pk?: boolean;
      fk?: string;
    };
  }>;
}>;

export type { TableInfo };
