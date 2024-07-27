import type { SelectChangeEvent } from "@mui/material";

import { useContextUser } from "../../hooks";
import { userFilterItems } from "../../constants";
import { CustomSelect, SearchInput } from "../../../../components";

export const UserSearchBar = () => {
  const { setFilter, filter } = useContextUser();

  const handleSearchChange = (value: string) => {
    setFilter({ ...filter, name: value });
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setFilter({ ...filter, typeUser: event.target.value });
  };

  return (
    <>
      <SearchInput
        onChange={handleSearchChange}
        placeholder="Search for users..."
        label="User Search"
        debounceTime={300}
      />

      <CustomSelect
        label="Select a role"
        items={userFilterItems}
        onChange={handleChange}
        value={filter.typeUser || ""}
      />
    </>
  );
};
