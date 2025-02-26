import { routes } from "@src/libs/routes";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex gap-2 list-none py-3 text-lg">
        <li>
          <Link className="link" to={routes.home()}>
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to}>
              {index < pathnames.length - 1 ? (
                <>
                  <span className="mr-2 text-content">/</span>
                  <Link className="capitalize link" to={to}>
                    {decodeURIComponent(value)}
                  </Link>
                </>
              ) : (
                <>
                  <span className="mr-2">/</span>
                  <span
                    className={`capitalize ${
                      index === pathnames.length - 1
                        ? "border-b-4 border-highlighted"
                        : "link"
                    }`}
                  >
                    {decodeURIComponent(value)}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
