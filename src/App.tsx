import {useEffect, useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import SearchResult from "./SearchResult.tsx";
import {APISearchSummary} from "./PagedResults.ts";
import {getDateOnly, isProduction, submitSearch} from "./Search.ts";

const oneDay: number = (24 * 60) * (60 * 1000);
const daysInRange: number = 90;

const allowedDateRange = {
  min: subtractDays(daysInRange),
  max: subtractDays(-1)
};

function subtractDays(days: number = 7): Date {
  const startDate = new Date();
  const milliseconds = days * oneDay;
  // @ts-ignore
  return new Date(startDate - milliseconds);  
}

function App() {
  const [modifiedDate, setModifiedDate] = useState(subtractDays(7))
  const [searchResults, setSearchResults] = useState(new APISearchSummary())

  useEffect(() => {
    async function fetchData() {
      const details = await getSearchResults(modifiedDate);
      setSearchResults(details);
    }
    fetchData();
  }, []);

  const getSearchResults = async (searchDate: Date): Promise<APISearchSummary> => {
    const msgId = toast.info('Searching', {autoClose: 1250});
    try {
      const details = await submitSearch(searchDate, isProduction());
      toast.dismiss(msgId);
      return details;
    } catch (error) {
      toast.error('Error, check console logs for details');
      const detail = error as unknown as Error;
      console.error(detail.message);
    }
    return new APISearchSummary();
  }

  if (searchResults.objectIDs.length === 0) {
    return (<>
      <h1>Loading...</h1>
      <button className="pad-items" onClick={async () => {
        const newDate = subtractDays();
        const details = await getSearchResults(newDate);
        setModifiedDate(newDate);
        setSearchResults(details);
      }}>Reset
      </button>
    </>);
  } else {
    return (
      <>
        <ToastContainer position="top-right"/>
        <h1>Metropolitan Museum of Art Viewer</h1>
        <div className="row">
          <label htmlFor="modifiedFilter">Changed after</label>
          <input id="modifiedFilter" min={getDateOnly(allowedDateRange.min)} max={getDateOnly(allowedDateRange.max)} type="date" value={getDateOnly(modifiedDate) as string} onChange={async (e) => {
            const newDate = new Date(e.target.value as unknown as string);
            if (newDate < allowedDateRange.min ) {
              toast.error(`Date must be after ${getDateOnly(allowedDateRange.min)}`);
              return;
            }
            if (newDate > allowedDateRange.max ) {
              toast.error(`Date must be before ${getDateOnly(allowedDateRange.max)}`);
              return;
            }
            const details = await getSearchResults(newDate);
            setModifiedDate(newDate);
            setSearchResults(details);
          }}/>
        </div>
        <div>
          <SearchResult {...searchResults} key={getDateOnly(modifiedDate)}/>
        </div>
      </>);
  }
}

export default App
