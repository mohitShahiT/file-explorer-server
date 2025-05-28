export enum FileKinds {
  pdf = "PDF Document",
  jpg = "JPG Image",
  png = "PNG Image",
  gif = "GIF Image",
  bmp = "Bitmap Image",
  svg = "SVG Vector Image",
  md = "MD Document",
  txt = "Plain Text Document",
  csv = "CSV Document",
  xlsx = "XLSX Document",
  xls = "Excel Spreadsheet",
  html = "HTML Document",
  htm = "HTML Document",
  js = "JavaScript Script",
  ts = "TypeScript File",
  jsx = "JSX Script",
  tsx = "TSX Script",
  css = "CSS Style Sheet",
  scss = "SCSS Style Sheet",
  json = "JSON Document",
  xml = "XML Document",
  docx = "Word Document",
  doc = "Word 97-2003 Document",
  pptx = "PowerPoint Presentation",
  ppt = "PowerPoint 97-2003 Presentation",
  zip = "ZIP Archive",
  rar = "RAR Archive",
  tar = "TAR Archive",
  gz = "GZIP Archive",
  mp3 = "MP3 Audio",
  wav = "WAV Audio",
  mp4 = "MP4 Video",
  mov = "MOV Video",
  avi = "AVI Video",
  mkv = "MKV Video",
  exe = "Windows Executable",
  dmg = "macOS Disk Image",
  iso = "ISO Disk Image",
  apk = "Android Package",
  none = "Document",
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
