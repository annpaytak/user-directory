import { Container, } from '@mui/material';
import { FileNode } from '@/types/file';
import mockData from '@/mocks/fileSystem.json';
import { filterTreeByQuery } from './utils/filterTreeByQuery';
import { useState } from 'react';
import { renderTree } from './utils/renderHelpers';

const FileSystemPage = () => {
  const [query, setQuery] = useState('');
  const [data] = useState<FileNode[]>(mockData);

  const filtered = query ? filterTreeByQuery(data, query) : data;

  return (
    <Container>
      <input
        type="text"
        placeholder="Search..."
        className="border px-2 py-1 w-full"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>{renderTree(filtered, 0, query)}</div>
    </Container>
  );
};

export default FileSystemPage
