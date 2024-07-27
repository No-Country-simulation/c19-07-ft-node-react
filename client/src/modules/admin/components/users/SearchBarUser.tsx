import { SearchInput, CustomSelect } from "../../../../components";
import { useState } from "react";
import { filterItems } from "../../pages/AdminUsersPage";
import { useContextUser } from "../hooks/useContextUser";

export const SearchBarUser = () => {
  const { getUserFilter } = useContextUser();
  const [roleFilter, setRoleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  getUserFilter({ name: nameFilter, typeUser: roleFilter });

  return (
    <>
      <SearchInput onChange={setNameFilter} />

      <CustomSelect
        label="Select a role"
        items={filterItems}
        onChange={setRoleFilter}
      />
    </>
  );
};
