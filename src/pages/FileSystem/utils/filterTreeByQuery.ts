import { FileNode } from '@/types/file';

export const filterTreeByQuery = (nodes: FileNode[], query: string): FileNode[] => {
  const lowerQuery = query.toLowerCase();

  return nodes
    .map((node) => {
      const children = node.children ? filterTreeByQuery(node.children, query) : [];

      const matches = node.name.toLowerCase().includes(lowerQuery);

      if (matches || children?.length) {
        return { ...node, children };
      }

      return null;
    })
    .filter(Boolean) as FileNode[];
};