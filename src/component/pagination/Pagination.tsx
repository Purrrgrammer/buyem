import { useState } from "react";
// type propType = {
//   totalPosts: number;
//   postPerpage: number;
//   currentPage: number;
//   setPostPerpage: number;
// };

const Pagination = ({
  totalPosts,
  postPerPage,
  currentPage,
  setCurrentPage,
}: any) => {
  const [active, setActive] = useState<Number>(1);
  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  const handleOnPaginate = (page: number) => {
    setActive(page);
    setCurrentPage(page);
    // console.log(`page ${page}, active${active}`);
  };

  const handleonNextPage = () => {
    if (currentPage <= pages.length) {
      setCurrentPage(currentPage + 1);
      setActive(currentPage + 1);
    }
    if (currentPage > pages.length - 1) {
      setCurrentPage(pages[0]);
      setActive(1);
    }
  };
  const handleonPreviousPage = () => {
    if (currentPage <= pages.length) {
      setCurrentPage(currentPage - 1);
      setActive(currentPage - 1);
    }
    if (currentPage < pages.length - 1) {
      setCurrentPage(pages.length);
      setActive(pages.length);
    }
  };
  return (
    <div className="d-flex justify-content-center my-5 pagination-container">
      <a className="pagination" onClick={handleonPreviousPage}>
        <img
          src="https://images.vexels.com/media/users/3/136983/isolated/preview/73c5e7dbef9d885a306c8927ef12f465-thick-right-arrowhead.png"
          alt=""
        />
      </a>
      {pages.map((page) => (
        <a
          className={`pagination
                  ${active === page ? "active" : undefined}
                `}
          key={page}
          onClick={() => {
            handleOnPaginate(page);
          }}
        >
          {page}
        </a>
      ))}
      <a className="pagination left" onClick={handleonNextPage}>
        <img
          className="left"
          src="https://images.vexels.com/media/users/3/136983/isolated/preview/73c5e7dbef9d885a306c8927ef12f465-thick-right-arrowhead.png"
          alt=""
        />{" "}
      </a>
    </div>
  );
};

export default Pagination;
