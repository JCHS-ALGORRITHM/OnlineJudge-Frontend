// noinspection JSCheckFunctionSignatures,JSValidateTypes

import { useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/slices/userSlice.js';

import PropTypes from 'prop-types';

import { Modal } from '../../';
import axios from '../../../utils/axios.js';

ChangeProfileModal.propType = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  user: PropTypes.object,
  nowUser: PropTypes.object,
  changeProfile: PropTypes.func,
};

export default function ChangeProfileModal({
  isOpen,
  setOpen,
  user,
  nowUser,
  onChangeProfile,
}) {
  const adminFlag = nowUser.admin && user.username !== nowUser.username;
  const flag2 = nowUser.admin && user.username === nowUser.username;

  const dispatch = useDispatch();

  const [realName, setRealName] = useState(user.realName);
  const [schoolGrade, setSchoolGrade] = useState(flag2 ? 3 : user.schoolGrade);
  const [schoolClass, setSchoolClass] = useState(flag2 ? 99 : user.schoolClass);
  const [schoolId, setSchoolId] = useState(flag2 ? 99 : user.schoolId);

  const [isProcess, setProcess] = useState(false);

  const handleChangeInfo = () => {
    (async () => {
      const url = adminFlag ? '/api/user/admin/info' : '/api/user/info';

      setProcess(true);
      const response = await axios.patch(url, {
        username: user.username,
        realName,
        schoolGrade,
        schoolClass,
        schoolId,
      });
      setProcess(false);

      if (!response) return;

      toast.success('정보를 변경했습니다.');

      onChangeProfile({ realName, schoolGrade, schoolClass, schoolId });

      if (nowUser.username === user.username) {
        dispatch(
          setUserData({
            username: user.username,
            realName,
            schoolGrade,
            schoolClass,
            schoolId,
            admin: user.admin,
          }),
        );
      }

      setOpen(false);
    })();
  };

  const ChangeInfoBtn = (
    <button
      onClick={handleChangeInfo}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      disabled={isProcess}
    >
      정보 변경
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      title={`${adminFlag ? '[관리자] ' : ''}정보 변경`}
      buttons={[ChangeInfoBtn]}
    >
      <div className="mb-2">
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          placeholder="이름"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
        />
      </div>

      <div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input
              id="schoolGrade"
              name="schoolGrade"
              type="number"
              autoComplete="schoolGrade"
              required
              disabled={flag2}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="학년"
              min={1}
              max={3}
              value={schoolGrade}
              onChange={(e) => setSchoolGrade(Number(e.target.value))}
            />
          </div>

          <div>
            <input
              id="schoolClass"
              name="schoolClass"
              type="number"
              autoComplete="schoolClass"
              required
              disabled={flag2}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="반"
              min={1}
              max={99}
              value={schoolClass}
              onChange={(e) => setSchoolClass(Number(e.target.value))}
            />
          </div>

          <div>
            <input
              id="schoolId"
              name="schoolId"
              type="number"
              autoComplete="schoolId"
              required
              disabled={flag2}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="번호"
              value={schoolId}
              min={1}
              max={99}
              onChange={(e) => setSchoolId(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
