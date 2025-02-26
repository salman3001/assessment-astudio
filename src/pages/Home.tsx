import { routes } from "@src/libs/routes";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-20 cursor-pointer">
      <Link to={routes.products()} className="link text-xl">
        Products
      </Link>
      <Link to={routes.users()} className="link text-xl">
        Users
      </Link>
    </div>
  );
}
