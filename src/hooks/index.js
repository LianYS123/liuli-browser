import { useCallback, useState } from "react";

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
