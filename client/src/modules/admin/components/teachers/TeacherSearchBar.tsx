import { useContextTeacher } from "../../hooks";
import { SearchInput } from "../../../../components";

export const TeacherSearchBar = () => {
  const { setFilter, filter } = useContextTeacher();

  const handleSearchChange = (value: string) => {
    setFilter({ ...filter, name: value });
  };

  return (
    <>
      <SearchInput
        sx={{ width: { sm: "60%" } }}
        onChange={handleSearchChange}
        placeholder="Search for teachers by name or email..."
        label="Teacher Search"
        debounceTime={300}
      />
    </>
  );
};
