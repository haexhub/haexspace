export interface IContextMenuItem {
  children?: IContextMenu[];
  handler?: (context?: any) => void;
  icon?: string;
  label: string;
  serperator?: boolean;
  shortcut?: string;
}
