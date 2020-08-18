export interface ProjetoOptions {
  label: string;
  value: number;
  icon?: () => JSX.Element;
  disabled?: boolean;
  selected?: boolean;
}