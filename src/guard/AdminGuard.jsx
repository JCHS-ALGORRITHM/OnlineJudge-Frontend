import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { ErrorPage } from '../pages';

AdminGuard.propTypes = {
  element: PropTypes.element,
};

export default function AdminGuard(element) {
  const user = useSelector((state) => state.user);

  if (user.loading || user.error) return <></>;

  if (user.name.length === 0) return <Navigate to={'/login'} />;
  if (!user.admin) return <ErrorPage error={'권한이 없습니다'} />;

  return element.element;
}
