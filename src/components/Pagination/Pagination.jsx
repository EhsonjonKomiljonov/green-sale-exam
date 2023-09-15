import ReactPaginate from 'react-paginate';

export const Pagination = ({ totalPage, setActivePage }) => {
  return (
    <ReactPaginate
      className="pagination justify-content-center my-4 gap-3"
      pageCount={totalPage || 1}
      previousLabel="<"
      nextLabel=">"
      previousLinkClassName="btn btn-primary"
      nextLinkClassName="btn btn-primary"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      onPageChange={(data) => setActivePage(data.selected + 1)}
      activeClassName="active"
    />
  );
};
