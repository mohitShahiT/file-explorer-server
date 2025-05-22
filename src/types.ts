export enum FileKinds {
  PDF = "PDF",
  Document = "Document",
  JPG = "JPG",
  PNG = "PNG",
  Folder = "Folder",
  MD = "MD",
  Text = "Text",
  XLSX = "XLSX",
  HTML = "HTML",
}

export interface Folder {
  id: string;
  name: string;
  createdAt: number;
  children: string[];
}

export interface File {
  id: string;
  name: string;
  createdAt: string;
  size: number;
  kind: FileKinds;
}
