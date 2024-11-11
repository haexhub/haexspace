export interface IColumn {
  prop: string;
  label: string;
  class?: string;
  formatter?: (item: any) => any;
}

export interface ITableFileColumn {
  prop: keyof ITableFile;
  label: string;
  class?: string;
  formatter?: (item: any) => any;
}

export interface ITableFile {
  id: string;
  name: string;
  size?: string | null;
  modified?: string | null;
  type?: string | null;
  parent?: string | null | ITableFile;
}
