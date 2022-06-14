import React, { PropsWithChildren } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface IProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}

const Paginate = ({
  pages,
  page,
  isAdmin,
  keyword,
}: PropsWithChildren<IProps>) => {
  return (
    <>
      {pages > 1 && (
        <Pagination>
          {Array.from(Array(pages).keys()).map((x: number) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </>
  );
};

Paginate.defaultProps = {
  isAdmin: false,
  keyword: '',
};

export default Paginate;
