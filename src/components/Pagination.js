import { Link } from "react-router-dom";
import "./Pagination.css";

function Pagination({
  pagination: {
    currentPage,
    currentItem,
    totalItems,
    itemsPerPage,
    linkBase,
    items,
  },
  nextLabel,
  prevLabel,
  spacer,
}) {
  let isFirstPage;
  let totalPages;
  let isLastPage;
  let prevPage;
  let nextPage;
  let show;

  if (Array.isArray(items)) {
    const itemIndex = items.indexOf(currentItem);
    currentPage = itemIndex + 1;
    // We are paginating based on the items rather than just incremental pages
    isFirstPage = currentPage === 1;
    totalPages = Math.ceil(items.length / itemsPerPage);
    isLastPage = currentPage === totalPages;
    prevPage = itemIndex > 0 ? items[itemIndex - 1] : null;
    nextPage = itemIndex < items.length - 1 ? items[itemIndex + 1] : null;
    show = items.length > 0;
  } else {
    isFirstPage = currentPage === 1;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    isLastPage = currentPage === totalPages;
    prevPage = currentPage - 1;
    nextPage = currentPage + 1;
    show = totalItems;
  }

  const nextLabelUse = nextLabel || "Next >";
  const prevLabelUse = prevLabel || "< Previous";
  const spacerUse = spacer || " • ";

  const previous = !isFirstPage ? (
    <li>
      <Link to={`/${linkBase}/${prevPage}`}>{prevLabelUse}</Link>
    </li>
  ) : (
    <></>
  );
  const next = !isLastPage ? (
    <li>
      <Link to={`/${linkBase}/${nextPage}`}>{nextLabelUse}</Link>
    </li>
  ) : (
    <></>
  );
  const separator = !isFirstPage && !isLastPage ? spacerUse : "";
  if (show) {
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
