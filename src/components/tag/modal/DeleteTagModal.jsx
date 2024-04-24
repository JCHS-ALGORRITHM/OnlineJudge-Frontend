import { useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import { Modal } from '../../';
import axios from '../../../utils/axios.js';

DeleteTagModal.propType = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  tag: PropTypes.object,
  onDeleteTag: PropTypes.func,
};

export default function DeleteTagModal({ isOpen, setOpen, tag, onDeleteTag }) {
  const [isProcess, setProcess] = useState(false);

  const handleDeleteTag = () => {
    (async () => {
      setProcess(true);
      const response = await axios.delete('/api/tag/admin', {
        data: {
          tagId: tag.id,
        },
      });
      setProcess(false);

      if (!response) return;

      toast.success(`${tag.tag} 태그를 삭제했습니다.`);

      onDeleteTag({ tagId: tag.id });

      setOpen(false);
    })();
  };

  const DeleteTagBtn = (
    <button
      onClick={handleDeleteTag}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      disabled={isProcess}
    >
      태그 삭제
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title="태그 삭제"
      buttons={[DeleteTagBtn]}
    >
      <p>
        정말&nbsp;
        <span className="font-bold text-red-500">{tag.tag}</span>를
        삭제하실건가요?
      </p>
    </Modal>
  );
}
