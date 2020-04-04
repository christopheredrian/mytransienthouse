import React from 'react';
import {Pagination} from 'react-bootstrap';

const PaginationLinks = ({ usersData, onPageNumberClick}) => {
    let items = [];

    for (let pageNumber = 1; pageNumber <= usersData.lastPage; pageNumber++) {
        items.push(
            <Pagination.Item
                key={pageNumber}
                active={pageNumber === usersData.currentPage}
                onClick={() => onPageNumberClick(pageNumber)}
            >
                {pageNumber}
            </Pagination.Item>,
        );
    }

    return (<Pagination>{items}</Pagination>)
};

export { PaginationLinks as default }
