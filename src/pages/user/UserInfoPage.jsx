import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CalendarHeatmap from 'react-calendar-heatmap';

import { ChangePasswordModal, ChangeProfileModal, UserStatistics } from '../../components';

import Converter from '../../utils/Converter.js';
import axios from '../../utils/axios.js';

export default function UserInfoPage() {
  const { username } = useParams();

  const nowUser = useSelector((state) => state.user);

  const [user, setUser] = useState({});

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.post('/api/user', { username });

      if (!response) return;

      setUser(response);
      setLoading(false);
    })();
  }, []);

  const onChangeProfile = ({
                             realName,
                             schoolGrade,
                             schoolClass,
                             schoolId,
                           }) => {
    setUser({ ...user, realName, schoolGrade, schoolClass, schoolId });
  };

  if (loading) return <></>;

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold mb-4 md:mb-0">
            {Converter.getUserNameWithInfo(user)}의 프로필
          </h1>

          {(nowUser.username === user.username || nowUser.admin) && (
            <div className="flex flex-row">
              <button
                onClick={() => setProfileModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
              >
                정보 변경
              </button>
              <button
                onClick={() => setPasswordModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                비밀번호 변경
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
          <div className="w-full lg:w-1/4">
            <h2 className="text-xl font-semibold mb-2">통계</h2>
            <UserStatistics user={user} />
          </div>

          <div className="w-full lg:w-3/4">
            <h2 className="text-xl font-semibold mb-2">스트릭</h2>
            <CalendarHeatmap
              values={[]}
              startDate={new Date(new Date() - 1000 * 60 * 60 * 24 * 240)}
              endDate={new Date()}
              monthLabels={Array(12)
                .fill(0)
                .map((v, i) => `${i + 1}월`)}
            />
          </div>
        </div>
      </div>

      <ChangeProfileModal
        isOpen={isProfileModalOpen}
        setOpen={setProfileModalOpen}
        user={user}
        nowUser={nowUser}
        onChangeProfile={onChangeProfile}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        setOpen={setPasswordModalOpen}
        user={user}
        nowUser={nowUser}
      />
    </>
  );
}
