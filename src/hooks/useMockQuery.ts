import { useEffect, useRef, useState } from 'react';
import { ErrorLike } from '../types';


export const useMockQuery = (
  data: any = null,
  loadDelayMS = 100,
  error: ErrorLike = null
) => {
  // mock query state
  const [state, setState] = useState<{
    loading: boolean;
    error: ErrorLike;
    data: any;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  // id for cleanup of the timeout
  const timeout = useRef(0);

  // effect to control loading/error/delay
  useEffect(() => {
    timeout.current = window.setTimeout(() => {
      if (error) {
        setState({
          loading: false,
          error,
          data: null,
        });
        return;
      }

      setState({
        loading: false,
        error: null,
        data,
      });
    }, loadDelayMS);

    // cleanup timeout
    return () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
