import { useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import { Modal } from '../../';
import axios from '../../../utils/axios.js';

CreateTagModal.propType = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  onCreateTag: PropTypes.func,
};

export default function CreateTagModal({ isOpen, setOpen, onCreateTag }) {
  const [tag, setTag] = useState('');

  const [isProcess, setProcess] = useState(false);

  const handleChangeTag = () => {
    (async () => {
      setProcess(true);
      const response = await axios.put('/api/tag/admin', {
        tag,
      });
      setProcess(false);

      if (!response) return;

      toast.success(`${tag} 태그를 생생했습니다.`);

      onCreateTag();

      setOpen(false);
      setTag('');
    })();
  };

  const CreateTagBtn = (
    <button
      onClick={handleChangeTag}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      disabled={isProcess}
    >
      태그 생성
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title="태그 생성"
      buttons={[CreateTagBtn]}
    >
      <div>
        <input
          id="tag"
          name="tag"
          type="text"
          autoComplete="tag"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          placeholder="태그"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
    </Modal>
  );
}
