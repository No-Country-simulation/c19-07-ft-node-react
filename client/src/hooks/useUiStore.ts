import { closeSideBar, openSideBar } from "../store/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "./reduxTypedHooks";

export const useUiStore = () => {
  const dispatch = useAppDispatch();

  const { isSideBarOpen } = useAppSelector((state) => state.ui);

  const handleOpenSideBar = () => {
    dispatch(openSideBar());
  };

  const handleCloseSideBar = () => {
    dispatch(closeSideBar());
  };

  return {
    // * Properties
    isSideBarOpen,

    // * Methods
    handleOpenSideBar,
    handleCloseSideBar,
  };
};
