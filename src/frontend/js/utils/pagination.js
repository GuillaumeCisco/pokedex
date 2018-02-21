/**
 * Created by guillaume on 9/16/16.
 */
import queryString from 'query-string';
import url from 'url';
import {isEmpty} from 'lodash';
import {pages as initialPages} from '../reducers/pagination';

function add_first_page(pages, previous, original_page, nb_pages, page_size) {
    const parsed_url = url.parse(previous),
        q = queryString.parse(parsed_url.query),
        base_url = `${parsed_url.protocol}//${parsed_url.host}${parsed_url.pathname}`,
        // FIXME specific to pokemon api with offset pagination, you can just use +q.page || 1 and delete everything related to offset
        previous_page = q.offset ? ((+q.offset + page_size) / page_size) : (+q.page || 1),
        parameters = {
            ...q,
            page: previous_page,
        };

    if (original_page === nb_pages) {
        parameters.page = original_page - 2;
        // specific first page
        if (parameters.page === 1) {
            delete parameters.page;
            delete parameters.offset;
            pages.unshift({
                number: 1,
                url: base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : ''),
            });
        }
        // specific last pages
        else {
            parameters.offset = (parameters.page - 1) * page_size;
            pages.unshift({
                number: parameters.page,
                url: original_page === 2 ?
                    previous :
                    (base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : '')),
            });
        }
    }

    // not reached first page
    if (parameters.page) {
        // specific first pages
        if (previous_page === 3) { // we know this previous_page, add it if not present
            if (parameters.page !== 2) {
                parameters.page = 2;
                parameters.offset = (parameters.page - 1) * page_size;
                pages.unshift({
                    number: 2,
                    url: base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : ''),
                });
            }
        }
        // add blank
        else if (previous_page !== 2) {
            pages.unshift({number: ''});
        }

        // add first page
        delete parameters.page;
        delete parameters.offset;
        pages.unshift({
            number: 1,
            url: base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : ''),
        });
    }

    return pages;
}

function add_last_page(pages, next, original_page, nb_pages, page_size) {
    const parsed_url = url.parse(next),
        q = queryString.parse(parsed_url.query),
        base_url = `${parsed_url.protocol}//${parsed_url.host}${parsed_url.pathname}`,
        // FIXME specific to pokemon api with offset pagination, you can just use +q.page || 1 and delete everything related to offset
        next_page = q.offset ? ((+q.offset + page_size) / page_size) : (+q.page || 1),
        parameters = {
            ...q,
            page: next_page,
        };

    if (original_page === 1) {
        parameters.page = original_page + 2;

        // specific last page
        if (parameters.page === nb_pages) {
            parameters.page = nb_pages;
            parameters.offset = (parameters.page - 1) * page_size;
            pages.push({
                number: nb_pages,
                url: base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : ''),
            });
        }
        // specific first page
        else {
            parameters.offset = (parameters.page - 1) * page_size;
            pages.push({
                number: parameters.page,
                url: base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : ''),
            });
        }
    }

    // not reach end
    if (parameters.page !== nb_pages) {
        // specific last pages
        if (next_page === nb_pages - 2) { // we know this next page, add it if not already present
            if (parameters.page !== nb_pages - 1) {
                parameters.page = nb_pages - 1;
                parameters.offset = (parameters.page - 1) * page_size;
                pages.push({
                    number: nb_pages - 1,
                    url: base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : ''),
                });
            }
        }
        // add blank
        else if (next_page !== nb_pages - 1) {
            pages.push({number: ''});
        }

        // add last page
        parameters.page = nb_pages;
        parameters.offset = (parameters.page - 1) * page_size;
        pages.push({
            number: nb_pages,
            url: base_url + (!isEmpty(parameters) ? `?${queryString.stringify(parameters)}` : ''),
        });
    }

    return pages;
}

export default function build_pages(page_size, page, {count, next, previous}) {
    const nb_pages = Math.ceil(count / page_size);

    let pages;
    if (page === 1) {
        pages = initialPages; // memoized initial state
    }
    else {
        pages = [{...initialPages[0], number: page}];
    }

    if (next) {
        pages.push({number: page + 1, url: next});
        // can we add next next page or last page
        if (page + 2 <= nb_pages) {
            pages = add_last_page(pages, next, page, nb_pages, page_size);
        }
    }

    if (previous) {
        pages.unshift({number: page - 1, url: previous});
        // can we add previous previous page or first?
        if (page - 2 > 0) {
            pages = add_first_page(pages, previous, page, nb_pages, page_size);
        }
    }
    return pages;
}
