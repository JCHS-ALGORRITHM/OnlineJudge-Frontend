import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import store from '../redux/store.js';

import { Header } from '../components';
import { AdminGuard, GuestGuard, UserGuard } from '../guard';
import {
  LoginPage,
  NotFound,
  RegisterPage,
  TagManagePage,
  UserInfoPage,
  UserManagePage,
} from '../pages';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<UserGuard element={<p>user</p>} />} />

          <Route
            path="/register"
            element={<GuestGuard element={<RegisterPage />} />}
          />
          <Route
            path="/login"
            element={<GuestGuard element={<LoginPage />} />}
          />
          <Route
            path="/user/:username"
            element={<UserGuard element={<UserInfoPage />} />}
          />

          <Route path="/problem" element={<p>문제 목록</p>} />
          <Route path="/problem/:problemId" element={<p>문제 상세 조회</p>} />

          <Route
            path="/admin/user"
            element={<AdminGuard element={<UserManagePage />} />}
          />

          <Route
            path="/admin/tag"
            element={<AdminGuard element={<TagManagePage />} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </Provider>
  );
}
