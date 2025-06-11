import { FileNode } from "@/types/file";
import { JSX } from "react";

const renderName = (name: string, query: string) => {
  if (!query) return name;

  const i = name.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return name;

  const before = name.slice(0, i);
  const match = name.slice(i, i + query.length);
  const after = name.slice(i + query.length);

  return (
    <>
      {before}
      <span style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>{match}</span>
      {after}
    </>
  );
};

export const renderTree = (nodes: FileNode[], depth = 0, query: string): JSX.Element[] =>
  nodes.map((node) => (
    <div key={node.id} style={{ paddingLeft: depth * 20 }}>
      {node.isFavourite ? '⭐' : ''}
      {node.type === 'folder' ? '📁' : '📄'} {renderName(node.name, query)}
      {node.children && renderTree(node.children, depth + 1, query)}
    </div>
  ));
