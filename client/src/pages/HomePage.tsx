import { Outlet } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <h1>School Metrics</h1>
      <div>
        <Outlet/>
      </div>
    </>
  );
}
