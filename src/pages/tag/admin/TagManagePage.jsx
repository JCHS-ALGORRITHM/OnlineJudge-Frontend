import { useEffect, useState } from 'react';

import { ChangeTagModal, CreateTagModal, DeleteTagModal, TagListTable } from '../../../components';

import axios from '../../../utils/axios.js';

export default function TagManagePage() {
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isChangeModalOpen, setChangeModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [modalArgs, setModalArgs] = useState({});

  const _tagList = tagList.sort((a, b) => a['id'].localeCompare(b['id']));

  useEffect(() => {
    onCreateTag();
  }, []);

  const openChangeModal = (tag) => {
    setChangeModalOpen(true);
    setModalArgs(tag);
  };

  const openDeleteModal = (tag) => {
    setDeleteModalOpen(true);
    setModalArgs(tag);
  };

  const onCreateTag = () => {
    (async () => {
      const response = await axios.get('/api/tag');

      if (!response) return;

      setTagList(response);
      setLoading(false);
    })();
  };

  const onChangeTag = ({ tagId, newTag }) => {
    setTagList([
      ...tagList.filter((x) => x.id !== tagId),
      { id: tagId, tag: newTag },
    ]);
  };

  const onDeleteTag = ({ tagId }) => {
    setTagList(tagList.filter((x) => x.id !== tagId));
  };

  if (loading) return <></>;

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold mb-4 md:mb-0">태그 관리</h1>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
          >
            새 태그
          </button>
        </div>

        <TagListTable
          tagList={_tagList}
          openChangeModal={openChangeModal}
          openDeleteModal={openDeleteModal}
        />
      </div>

      <CreateTagModal
        isOpen={isCreateModalOpen}
        setOpen={setCreateModalOpen}
        onCreateTag={onCreateTag}
      />

      <ChangeTagModal
        isOpen={isChangeModalOpen}
        setOpen={setChangeModalOpen}
        tag={modalArgs}
        onChangeTag={onChangeTag}
      />

      <DeleteTagModal
        isOpen={isDeleteModalOpen}
        setOpen={setDeleteModalOpen}
        tag={modalArgs}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
}
