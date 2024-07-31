import { useContextStudent } from "../../hooks";
import { SearchInput } from "../../../../components";

export const StudentSearchBar = () => {
  const { setFilter, filter } = useContextStudent();

  const handleSearchChange = (value: string) => {
    setFilter({ ...filter, name: value });
  };

  return (
    <>
      <SearchInput
        sx={{ width: { sm: "60%" } }}
        onChange={handleSearchChange}
        placeholder="Search for students by name or email..."
        label="Student Search"
        debounceTime={300}
      />
    </>
  );
};
