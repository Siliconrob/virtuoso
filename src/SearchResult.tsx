import SearchResultItem from "./SearchResultItem";
import {APISearchSummary, ItemDetails, PagedResult} from "./PagedResults.ts";
import React, {useState} from "react";
import {toast} from "react-toastify";

function getCurrentPage(objectIds: Array<number>, currentPage: number, itemsPerPage: number): PagedResult {
  const response = new PagedResult();
  response.currentPage = currentPage;
  response.itemsPerPage = itemsPerPage;
  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;
  response.ids = objectIds.slice(start, end);
  return response;
}

function setInitialPage(objectIds: Array<number>) {
  const start = new PagedResult();
  return getCurrentPage(objectIds, start.currentPage, start.itemsPerPage);
}

const SearchResult: React.FC<APISearchSummary> = (results: APISearchSummary) => {
  // @ts-ignore
  const search = results.data as APISearchSummary;
  const [pagedResults, setPagedResults] = useState(setInitialPage(search.objectIDs));

  const renderSearchResults = (currentPage) => {
    if (currentPage.ids.length !== 0) {
      const displayPage = getCurrentPage(search.objectIDs, currentPage.currentPage, currentPage.itemsPerPage);
      return displayPage.ids.map((z: ItemDetails) => <SearchResultItem data={z} key={z}/>);
    }
    return null;
  }
  
  return (
    <div>
      <button className="pad-items" onClick={async () => {
        const pageNumber = pagedResults.currentPage - 1;
        if (pageNumber < 1) {
          toast.info('No previous page found');
          return;
        }
        const previousPage = getCurrentPage(search.objectIDs, pageNumber, pagedResults.itemsPerPage);
        if (previousPage.ids.length === 0) {
          toast.info('No items on this page');
          return;
        }
        setPagedResults(previousPage);
      }}>Previous Page
      </button>
      <button className="pad-items" onClick={async () => {
        const pageNumber = pagedResults.currentPage + 1;
        if (pageNumber > Math.ceil(search.total / pagedResults.itemsPerPage)) {
          toast.info('No next page found');
          return;
        }
        const nextPage = getCurrentPage(search.objectIDs, pageNumber, pagedResults.itemsPerPage);
        if (nextPage.ids.length === 0) {
          toast.info('No items on this page');
          return;
        }
        setPagedResults(nextPage);
      }}>Next Page
      </button>
      <div className="pad-items">
        <p>Total results: <b>{search.total}</b>, Current Page <b>{pagedResults.currentPage}</b>, items per
          page <b>{pagedResults.itemsPerPage}</b></p>
      </div>

      {renderSearchResults(pagedResults)}
    </div>
  )
}

export default SearchResult;