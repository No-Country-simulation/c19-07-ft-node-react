import { useContextParent } from "../../hooks";
import { SearchInput } from "../../../../components";

export const ParentSearchBar = () => {
  const { setFilter, filter } = useContextParent();

  const handleSearchChange = (value: string) => {
    setFilter({ ...filter, name: value });
  };

  return (
    <>
      <SearchInput
        sx={{ width: { sm: "60%" } }}
        onChange={handleSearchChange}
        placeholder="Search for parents by name or email..."
        label="Parent Search"
        debounceTime={300}
      />
    </>
  );
};
