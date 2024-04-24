import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

UserGuard.propTypes = {
  element: PropTypes.element,
};

export default function UserGuard(element) {
  const user = useSelector((state) => state.user);

  if (user.loading || user.error) return <></>;

  if (user.name.length === 0) return <Navigate to={'/login'} />;

  return element.element;
}
