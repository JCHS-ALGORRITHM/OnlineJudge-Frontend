import { useEffect, useState } from 'react';

import { UserListTable } from '../../../components';

import axios from '../../../utils/axios.js';

export default function UserManagePage() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/user/admin/users');

      if (!response) return;
      const userList = response.sort((a, b) => {
        if (a.schoolGrade !== b.schoolGrade) {
          return a.schoolGrade - b.schoolGrade;
        } else if (a.schoolClass !== b.schoolClass) {
          return a.schoolClass - b.schoolClass;
        } else {
          return a.schoolId - b.schoolId;
        }
      });

      setUserList(userList);
      setLoading(false);
    })();
  }, []);

  if (loading) return <></>;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">유저 관리</h1>
      </div>

      <UserListTable userList={userList} />
    </div>
  );
}
