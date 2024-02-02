import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';

import useFileStore from '@/src/store/fileStore';

const FileList = () => {
  const { files, removeFile } = useFileStore(
    useShallow((state) => ({
      files: state.files,
      removeFile: state.removeFile,
    })),
  );
  const removeFileHandler = (fileName: string) => {
    removeFile(fileName);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Listbox
        color="primary"
        variant="light"
        aria-label="Listbox menu with icons"
        className="rounded-small bg-primary-50 "
      >
        <ListboxSection title="파일 목록">
          {files.map((file) => (
            <ListboxItem
              key={file.name}
              endContent={
                <FaRegTrashAlt
                  className="text-danger"
                  onClick={() => removeFileHandler(file.name)}
                />
              }
            >
              {file.name}
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default FileList;
