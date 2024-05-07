import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa6';

import { useDispatch, useSelector } from 'react-redux';
import { logout, setLoading, setUserData } from '../redux/slices/userSlice.js';

import axios from '../utils/axios.js';
import Cookies from '../utils/Cookies.js';
import Converter from '../utils/Converter.js';

const ADMIN_DROPDOWN = [
  { path: '/admin/user', label: '유저 목록' },
  { path: '---' },
  { path: '/admin/tag', label: '태그 관리' },
  { path: '/admin/problem', label: '문제 목록' },
  { path: '/admin/history', label: '채점 기록' },
  { path: '---' },
  { path: '/admin/user', label: '수업 관리' },
];

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [isLectureDropdownOpen, setLectureDropdownOpen] = useState(false);
  const [isAdminDropDownOpen, setAdminDropDownOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!Cookies.hasCookie('access_token')) {
        dispatch(setLoading({ loading: false }));
        return;
      }

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${Cookies.getCookie('access_token')}`;

      const response = await axios.get('/api/user');

      if (!response) return;

      toast.success(`${Converter.getUserNameWithInfo(response)}님 환영합니다!`);

      dispatch(setUserData(response));
    })();
  }, []);

  const _setLectureDropdownOpen = (value) => {
    setLectureDropdownOpen(value)
    setAdminDropDownOpen(false)
    setUserMenuOpen(false)
  }

  const _setAdminDropDownOpen = (value) => {
    setLectureDropdownOpen(false)
    setAdminDropDownOpen(value)
    setUserMenuOpen(false)
  }

  const _setUserMenuOpen = (value) => {
    setLectureDropdownOpen(false)
    setAdminDropDownOpen(false)
    setUserMenuOpen(value)
  }

  if (user.loading) return <></>;

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-bold">
          Online Judge
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <button
                className="text-white hover:underline flex items-center"
                onClick={() => _setLectureDropdownOpen(!isLectureDropdownOpen)}
              >
                내 수업&nbsp;
                {user.name.length !== 0 && (
                  <>
                    {isLectureDropdownOpen ? (
                      <FaChevronLeft size={10} />
                    ) : (
                      <FaChevronDown size={10} />
                    )}
                  </>
                )}
              </button>

              {isLectureDropdownOpen && user.name.length !== 0 && (
                <ul className="absolute bg-white text-gray-900 border border-gray-300 rounded-md mt-1 min-w-max">
                  <li>
                    <Link
                      to="/"
                      className="block py-2 px-4 hover:bg-gray-100"
                      onClick={() => _setLectureDropdownOpen(false)}
                    >
                      테스트
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/board" className="text-white hover:underline">
                게시판
              </Link>
            </li>

            {user.admin && (
              <li className="relative group">
                <button
                  className="text-white hover:underline flex items-center"
                  onClick={() => _setAdminDropDownOpen(!isAdminDropDownOpen)}
                >
                  관리자&nbsp;
                  {isAdminDropDownOpen ? (
                    <FaChevronLeft size={10} />
                  ) : (
                    <FaChevronDown size={10} />
                  )}
                </button>

                {isAdminDropDownOpen && (
                  <ul className="absolute bg-white text-gray-900 border border-gray-300 rounded-md mt-1 min-w-max">
                    {ADMIN_DROPDOWN.map(({ path, label }, idx) => (
                      <li
                        key={idx}
                        className={
                          path === '---' ? 'border-t border-gray-300' : ''
                        }
                      >
                        {path !== '---' && (
                          <Link
                            to={path}
                            className="block py-2 px-4 hover:bg-gray-100"
                            onClick={() => _setAdminDropDownOpen(false)}
                          >
                            {label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="mr-5 flex items-center space-x-4">
        {user.name.length !== 0 && (
          <>
            <button
              className="text-white hover:underline"
              onClick={() => _setUserMenuOpen(!isUserMenuOpen)}
            >
              {Converter.getUserNameWithInfo(user)}
            </button>

            {isUserMenuOpen && (
              <ul className="absolute bg-white text-gray-900 border border-gray-300 rounded-md mt-1 min-w-max">
                <li>
                  <Link
                    to={`/user/${user.username}`}
                    className="block py-2 px-4 hover:bg-gray-100"
                    onClick={() => _setUserMenuOpen(false)}
                  >
                    내 정보
                  </Link>
                </li>

                <li className="border-t border-gray-300" />

                <li
                  className="block py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    Cookies.removeCookie('access_token');
                    axios.defaults.headers.common['Authorization'] = null;
                    dispatch(logout());

                    toast.success('로그아웃 되었습니다.');

                    setUserMenuOpen(false);
                  }}
                >
                  로그아웃
                </li>
              </ul>
            )}
          </>
        )}
      </div>
    </header>
  );
}
