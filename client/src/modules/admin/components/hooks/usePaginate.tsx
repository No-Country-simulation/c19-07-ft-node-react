import { ChangeEvent, useState } from "react";
import { useContextUser } from "./useContextUser";

export const usePaginate = (
  initialPage: number,
  initialRowsPerPage: number
) => {
    const {getUserFilter} = useContextUser();
  const [page, setPage] = useState(initialPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
 
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    const  parSePage = String(newPage)
    const parseLimit = String(rowsPerPage)
    getUserFilter({page:parSePage,limit:parseLimit})
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    
    getUserFilter({limit:event.currentTarget.value})
    setPage(0);
  };
  return { handleChangePage, handleChangeRowsPerPage, rowsPerPage, page };
};
