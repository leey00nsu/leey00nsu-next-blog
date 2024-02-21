'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { savePostLocal, savePostRemote } from '@/src/actions/studio/savePost';

import getFrontmatter from '@/src/libs/getFrontmatter';

import useModal from '@/src/hooks/modal/useModal';
import useEditorInitializer from '@/src/hooks/studio/useEditorInitializer';

import useEditorStore, { Frontmatter } from '@/src/store/editorStore';
import useFileStore from '@/src/store/fileStore';

import SignOutButton from '../auth/sign-out/SignOutButton';
import { ActiveButton } from '../ui/buttons';

interface MenuProps {
  isEdit?: boolean;
}

const Menu = ({ isEdit }: MenuProps) => {
  const { addModal } = useModal();
  const { resetEditor } = useEditorInitializer(undefined);
  const { source, slug, title, tags, description, date } = useEditorStore(
    useShallow((state) => ({
      source: state.source,
      slug: state.slug,
      title: state.title,
      tags: state.tags,
      description: state.description,
      date: state.date,
    })),
  );
  const files = useFileStore((state) => state.files);
  const [isSavable, setIsSavable] = useState(false);
  const originalSlug = useParams().slug;

  const toastResponse = (response: { success: boolean; message: string }) => {
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const generateFormData = () => {
    const frontmatter = getFrontmatter({
      slug,
      title,
      tags,
      description,
      date,
    });
    const content = `${frontmatter}\n${source}`;

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('content', content);

    files.forEach((file) => {
      formData.append('files', file);
    });

    return formData;
  };

  const saveLocalHandler = async () => {
    const formData = generateFormData();

    addModal({
      type: 'confirm',
      title: '파일로 저장',
      content: <p>파일로 저장할까요?</p>,
      callback: () => {
        addModal({
          type: 'loading',
          title: '파일로 저장 중...',
          content: <></>,
          callback: async () => {
            const response = await savePostLocal(formData);
            toastResponse(response);
          },
        });
      },
    });
  };

  const uploadHandler = async () => {
    const formData = generateFormData();

    addModal({
      type: 'confirm',
      title: '업로드',
      content: <p>업로드할까요?</p>,
      callback: () => {
        addModal({
          type: 'loading',
          title: '업로드 중...',
          content: <></>,
          callback: async () => {
            const response = await savePostRemote(formData, false);
            toastResponse(response);
          },
        });
      },
    });
  };

  const editHandler = async () => {
    const formData = generateFormData();

    addModal({
      type: 'confirm',
      title: '수정',
      content: <p>수정할까요?</p>,
      callback: () => {
        addModal({
          type: 'loading',
          title: '수정 중...',
          content: <></>,
          callback: async () => {
            const response = await savePostRemote(formData, true);
            toastResponse(response);
          },
        });
      },
    });
  };

  const resetHandler = () => {
    toast.success('초기화 되었습니다.');
    resetEditor();
  };

  useEffect(() => {
    const validation = Frontmatter.safeParse({
      slugObject: { slug, originalSlug, isEdit },
      title,
      tags,
      description,
      date,
      files,
    });

    setIsSavable(validation.success);
  }, [slug, title, tags, description, date, files]);

  return (
    <div className="flex flex-row justify-end gap-2 p-4">
      <SignOutButton />
      <ActiveButton onPress={resetHandler}>초기화</ActiveButton>
      {process.env.NODE_ENV === 'development' && (
        <ActiveButton onPress={saveLocalHandler} isDisabled={!isSavable}>
          파일로 저장
        </ActiveButton>
      )}
      {isEdit && (
        <ActiveButton onPress={editHandler} isDisabled={!isSavable}>
          수정
        </ActiveButton>
      )}
      {!isEdit && (
        <ActiveButton onPress={uploadHandler} isDisabled={!isSavable}>
          업로드
        </ActiveButton>
      )}
    </div>
  );
};

export default Menu;
