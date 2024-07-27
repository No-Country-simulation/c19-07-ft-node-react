import { SelectChangeEvent } from "@mui/material";
import { CustomSelect, SearchInput } from "../../../../components";
import { filterItems } from "../../pages/AdminUsersPage";
import { useContextUser } from "../hooks/useContextUser";

export const SearchBarUser = () => {
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
        sx={{ width: "60%" }}
      />

      <CustomSelect
        label="Select a role"
        items={filterItems}
        onChange={handleChange}
        value={filter.typeUser || ""}
      />
    </>
  );
};
