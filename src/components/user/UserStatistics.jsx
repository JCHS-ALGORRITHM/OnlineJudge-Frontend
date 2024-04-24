import PropTypes from 'prop-types';

UserStatistics.propTypes = {
  user: PropTypes.object,
};

export default function UserStatistics({ user }) {
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td>맞은 문제</td>
          <td>0</td>
        </tr>
        <tr>
          <td>제출</td>
          <td>0</td>
        </tr>
        <tr>
          <td className="text-green-500">맞았습니다</td>
          <td className="text-green-500">0</td>
        </tr>
        <tr>
          <td className="text-red-500">틀렸습니다</td>
          <td className="text-red-500">0</td>
        </tr>
        <tr>
          <td className="text-orange-500">시간 초과</td>
          <td className="text-orange-500">0</td>
        </tr>
        <tr>
          <td className="text-orange-500">메모리 초과</td>
          <td className="text-orange-500">0</td>
        </tr>
        <tr>
          <td className="text-purple-500">런타임 에러</td>
          <td className="text-purple-500">0</td>
        </tr>
        <tr>
          <td className="text-purple-500">컴파일 에러</td>
          <td className="text-purple-500">0</td>
        </tr>
      </tbody>
    </table>
  );
}
