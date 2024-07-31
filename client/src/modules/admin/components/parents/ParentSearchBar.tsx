import { useContextParent } from "../../hooks";
import { SearchInput } from "../../../../components";

export const ParentSearchBar = () => {
  const { setFilter, filter } = useContextParent();

  const handleSearchChange = (value: string) => {
    setFilter({ ...filter, name: value, page: "1" });
  };

  return (
    <>
      <SearchInput
        sx={{ width: { sm: "60%" } }}
        onChange={handleSearchChange}
        placeholder="Search for parents by name..."
        label="Parent Search"
        debounceTime={300}
      />
    </>
  );
};
