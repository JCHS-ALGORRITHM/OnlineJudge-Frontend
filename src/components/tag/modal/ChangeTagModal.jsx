import { useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import { Modal } from '../../';
import axios from '../../../utils/axios.js';

ChangeTagModal.propType = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  tag: PropTypes.object,
  onChangeTag: PropTypes.func,
};

export default function ChangeTagModal({ isOpen, setOpen, tag, onChangeTag }) {
  const [newTag, setNewTag] = useState('');

  const [isProcess, setProcess] = useState(false);

  const handleChangeTag = () => {
    (async () => {
      setProcess(true);
      const response = await axios.patch('/api/tag/admin', {
        tagId: tag.id,
        newTag,
      });
      setProcess(false);

      if (!response) return;

      toast.success(`${tag.tag} 태그를 ${newTag} 태그로 변경했습니다.`);

      onChangeTag({ tagId: tag.id, newTag });

      setOpen(false);
      setNewTag('');
    })();
  };

  const ChangeTagBtn = (
    <button
      onClick={handleChangeTag}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      disabled={isProcess}
    >
      태그 변경
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title="태그 변경"
      buttons={[ChangeTagBtn]}
    >
      <div>
        <input
          id="tag"
          name="tag"
          type="text"
          autoComplete="tag"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          placeholder={tag.tag}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
      </div>
    </Modal>
  );
}
