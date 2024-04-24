import { useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import { Modal } from '../../';
import axios from '../../../utils/axios.js';

ChangePasswordModal.propType = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  user: PropTypes.object,
  nowUser: PropTypes.object,
};

export default function ChangePasswordModal({
  isOpen,
  setOpen,
  user,
  nowUser,
}) {
  const adminFlag = nowUser.admin && user.username !== nowUser.username;

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  const [isProcess, setProcess] = useState(false);

  const handleChangePassword = () => {
    if (newPassword !== newConfirmPassword) {
      toast.error('비밀번호와 비밀번호 확인이 다릅니다.');
      return;
    }

    (async () => {
      const url = adminFlag ? '/api/user/admin/password' : '/api/user/password';

      setProcess(true);
      const response = await axios.patch(url, {
        username: user.username,
        password,
        newPassword,
      });
      setProcess(false);

      if (!response) return;

      toast.success('비밀번호를 변경했습니다.');

      setPassword('');
      setNewPassword('');
      setNewConfirmPassword('');

      setOpen(false);
      setPassword('');
      setNewPassword('');
      setNewConfirmPassword('');
    })();
  };

  const ChangePasswordBtn = (
    <button
      onClick={handleChangePassword}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      disabled={isProcess}
    >
      비밀번호 변경
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title={`${adminFlag ? '[관리자] ' : ''}비밀번호 변경`}
      buttons={[ChangePasswordBtn]}
    >
      <div className="mb-2">
        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            disabled={adminFlag}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder={
              adminFlag ? '[관리자] 강제 비밀번호 변경' : '현재 비밀번호'
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            id="newConfirmPassword"
            name="newConfirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="새 비밀번호 확인"
            value={newConfirmPassword}
            onChange={(e) => setNewConfirmPassword(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}
