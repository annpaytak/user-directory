
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  isFavourite: boolean;
  children?: FileNode[];
}