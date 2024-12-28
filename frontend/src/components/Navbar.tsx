import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 p-4 shadow-md">
      <Link to={"/"} className="btn btn-ghost text-xl">
        Home
      </Link>

      <div className="ml-auto">
        <Link to={"/create"} className="btn btn-primary text-xl ml-4">
          Create Product
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
