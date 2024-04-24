import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

UserListTable.propTypes = {
  userList: PropTypes.array,
};

export default function UserListTable({ userList }) {
  return (
    <table className=" border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">ID</th>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">학년</th>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">반</th>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">번호</th>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">이름</th>
        </tr>
      </thead>

      <tbody>
        {userList.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              <Link
                to={`/user/${item.username}`}
                className="text-blue-500 hover:underline"
              >
                {item.username}
              </Link>
            </td>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              {item.schoolGrade}
            </td>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              {item.schoolClass}
            </td>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              {item.schoolId}
            </td>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              {item.realName}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
