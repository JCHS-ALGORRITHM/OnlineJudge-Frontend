// noinspection JSCheckFunctionSignatures

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import axios from '../../utils/axios.js';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [realName, setRealName] = useState('');
  const [schoolGrade, setSchoolGrade] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  const [schoolId, setSchoolId] = useState('');

  const [isProcess, setProcess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('비밀번호와 비밀번호 확인이 다릅니다.');
      return;
    }

    (async () => {
      setProcess(true);
      const response = await axios.put('/api/user/auth', {
        username,
        password,
        realName,
        schoolGrade,
        schoolClass,
        schoolId,
      });
      setProcess(false);

      if (!response) return;

      toast.success('회원가입 성공!');
      navigate('/login');
    })();
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="아이디"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="비밀번호"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="비밀번호 확인"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
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
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
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
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
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
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="번호"
                      value={schoolId}
                      min={1}
                      max={99}
                      onChange={(e) => setSchoolId(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={isProcess}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
