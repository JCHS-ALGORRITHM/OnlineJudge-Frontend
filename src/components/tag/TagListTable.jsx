import PropTypes from 'prop-types';

TagListTable.propTypes = {
  tagList: PropTypes.array,
  openChangeModal: PropTypes.func,
  openDeleteModal: PropTypes.func,
};

export default function TagListTable({
  tagList,
  openChangeModal,
  openDeleteModal,
}) {
  return (
    <table className=" border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">태그</th>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">수정</th>
          <th className="py-2 px-4 border border-gray-300 rounded-lg">삭제</th>
        </tr>
      </thead>

      <tbody>
        {tagList.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              {item.tag}
            </td>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              <button
                onClick={() => openChangeModal(item)}
                className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 mr-4"
              >
                수정
              </button>
            </td>
            <td className="py-2 px-4 border border-gray-300 rounded-lg">
              <button
                onClick={() => openDeleteModal(item)}
                className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 mr-4"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
