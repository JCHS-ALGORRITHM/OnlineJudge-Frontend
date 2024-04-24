import axios from 'axios';
import { toast } from 'react-toastify';

const PROXY_METHOD = ['get', 'post', 'put', 'patch', 'delete'];

const axiosInstance = axios.create();

const axiosProxy = new Proxy(axiosInstance, {
  get: function(target, property, receiver) {
    const method = target[property];

    if (PROXY_METHOD.includes(property)) {
      return async function(...args) {
        try {
          const { data: { content } } = await method.apply(this, args);

          return content;
        } catch (e) {
          if (axios.isAxiosError(e)) {
            const {
              data: { error, content },
            } = e.response;

            if (error) {
              toast.error(content.message);
            } else {
              toast.error('알 수 없는 오류가 발생했습니다.');
            }

            return false;
          }

          throw e;
        }
      };
    }

    return method;
  },
});

export default axiosProxy;
