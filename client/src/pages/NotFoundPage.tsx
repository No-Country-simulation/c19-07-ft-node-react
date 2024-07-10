import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div>
      <Link to="/">Back Home</Link>
      <h1>404 Not found</h1>
    </div>
  );
}
