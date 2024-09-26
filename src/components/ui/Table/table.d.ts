export interface IColumn {
  prop: string;
  label: string;
  class?: string;
  formatter?: (item: any) => any;
}
