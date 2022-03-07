import { Link } from "react-router-dom";
import "./Pagination.css";

function Pagination({
  pagination: { currentPage, totalItems, itemsPerPage, linkBase },
}) {
  const isFirstPage = currentPage === 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isLastPage = currentPage == totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const previous = !isFirstPage ? (
    <li>
      <Link to={`/${linkBase}/${prevPage}`}>&lt; Previous</Link>
    </li>
  ) : (
    <></>
  );
  const next = !isLastPage ? (
    <li>
      <Link to={`/${linkBase}/${nextPage}`}>Next &gt;</Link>
    </li>
  ) : (
    <></>
  );
  const separator = !isFirstPage && !isLastPage ? " • " : "";
  if (totalItems) {
    return (
      <nav className="pagination">
        <ul>
          {previous}
          {separator}
          {next}
        </ul>
      </nav>
    );
  } else return <></>;
}
export default Pagination;
