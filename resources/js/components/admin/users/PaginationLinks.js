import React from 'react';
import {Pagination} from 'react-bootstrap';

const PaginationLinks = ({ usersData, onPageNumberClick}) => {
    let items = [];

    for (let number = 1; number <= usersData.lastPage; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === usersData.currentPage}
                onClick={() => onPageNumberClick(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    return (<Pagination>{items}</Pagination>)
}

export { PaginationLinks as default }
