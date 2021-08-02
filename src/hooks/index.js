import {
  useTable as useRawTable,
  useRequest as useRawRequest,
} from "lian-hooks";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";


export const useRequest = (key, service, opt) => {
  return useRawRequest({
    ...opt,
    onError: (error) => errorHandler(error, history),
  });
};

export const useTable = (options) => {
  const { formatter = defaultFormatter } = options;
  const history = useHistory();
  return useRawTable({
    ...options,
    formatter,
    pageSizeField: "pageSize",
    onError: (error) => errorHandler(error, history),
  });
};

 export const useModalAction = (initialProps) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [props, setProps] = useState(initialProps || {});
  const openModal = useCallback((props) => {
    setIsOpen(true)
    setProps(props);
  }, [setIsOpen]);
  const closeModal = useCallback(() => {
    setIsOpen(false)
    setProps(initialProps);
  }, [initialProps, setIsOpen]);
  return {
    openModal,
    closeModal,
    open: isOpen,
    ...props
  };
};
