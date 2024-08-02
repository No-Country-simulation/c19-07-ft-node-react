import { useContextAcArea } from "../../hooks";
import { SearchInput } from "../../../../components";

export const AcAreaSearchBar = () => {
  const { setFilter, filter } = useContextAcArea();

  const handleSearchChange = (value: string) => {
    setFilter({ ...filter, name: value });
  };

  return (
    <>
      <SearchInput
        sx={{ width: { sm: "60%" } }}
        onChange={handleSearchChange}
        placeholder="Search for academic areas by name or email..."
        label="Academic Areas Search"
        debounceTime={300}
      />
    </>
  );
};
