import React, {useEffect, useState} from "react";
import {ItemDetails} from "./PagedResults.ts";
import {getItemDetails, isProduction} from "./Search.ts";
import ModalImage from "react-modal-image";

const SearchResultItem : React.FC<number> = (data: number) => {
  // @ts-ignore
  const id = data.data as number;
  const [item, setItem] = useState(new ItemDetails());
  const renderDetail = (fieldValue: string, fieldName: string) => {
    return (fieldValue !== "" ? <div className="text-left"><span><b>{fieldName}:</b> {fieldValue}</span></div> : null)
  }

  useEffect(() => {
    async function fetchData(objectId: number) {
      const details = await getItemDetails(objectId, isProduction())
      setItem(details);
    }
    fetchData(id);
  }, [id]);

  const renderTags = (tags: Array<object>) => {
    const toRender = (tags || []).slice(0, 3);
    if (toRender.length > 0) {
      // @ts-ignore
      return <div className="text-left"><span><b>Tags:</b> {toRender.map(z => z?.term || "").join(", ")}</span></div>
    }
    return null;
  }
  
  const getImagePreview = (smallImageUrl: string, largeImageUrl: string): string => {
    if (smallImageUrl === "" || smallImageUrl === null) {
      if (largeImageUrl === "" || largeImageUrl === null) {
        return "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgaWQ9Imljb24iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiLz48ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGcgaWQ9IlNWR1JlcG9faWNvbkNhcnJpZXIiPgo8ZGVmcz4KPHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fTwvc3R5bGU+CjwvZGVmcz4KPHRpdGxlPm5vLWltYWdlPC90aXRsZT4KPHBhdGggZD0iTTMwLDMuNDE0MSwyOC41ODU5LDIsMiwyOC41ODU5LDMuNDE0MSwzMGwyLTJIMjZhMi4wMDI3LDIuMDAyNywwLDAsMCwyLTJWNS40MTQxWk0yNiwyNkg3LjQxNDFsNy43OTI5LTcuNzkzLDIuMzc4OCwyLjM3ODdhMiwyLDAsMCwwLDIuODI4NCwwTDIyLDE5bDQsMy45OTczWm0wLTUuODMxOC0yLjU4NTgtMi41ODU5YTIsMiwwLDAsMC0yLjgyODQsMEwxOSwxOS4xNjgybC0yLjM3Ny0yLjM3NzFMMjYsNy40MTQxWiIvPgo8cGF0aCBkPSJNNiwyMlYxOWw1LTQuOTk2NiwxLjM3MzMsMS4zNzMzLDEuNDE1OS0xLjQxNi0xLjM3NS0xLjM3NWEyLDIsMCwwLDAtMi44Mjg0LDBMNiwxNi4xNzE2VjZIMjJWNEg2QTIuMDAyLDIuMDAyLDAsMCwwLDQsNlYyMloiLz4KPHJlY3QgaWQ9Il9UcmFuc3BhcmVudF9SZWN0YW5nbGVfIiBkYXRhLW5hbWU9IiZsdDtUcmFuc3BhcmVudCBSZWN0YW5nbGUmZ3Q7IiBjbGFzcz0iY2xzLTEiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPgo8L2c+Cjwvc3ZnPg==";
      }
      return largeImageUrl;
    }
    return smallImageUrl;
  }
  
  return (
    <>
      <div className="card flex-container">
        <div className="flex-child">
          <ModalImage
            className="preview-image"
            small={getImagePreview(item.primaryImageSmall, item.primaryImage)}
            large={item.primaryImage}
            alt={item.title}
          />
          {/*<img className="preview-image" loading="lazy" width={200} height={200} src={item.primaryImageSmall} alt={item.title}/>*/}
        </div>
        <div className="flex-child">
          <a className="search-link" href={item.objectURL} target="_blank">
            <p>
              {renderDetail(item.title, "Title")}
              {renderDetail(item.objectDate, "Date")}
              {renderDetail(item.department, "Department")}
              {renderDetail(item.artistRole, "Artist Role")}
              {renderDetail(item.artistDisplayName, "Artist Name")}
              {renderDetail(item.artistNationality, "Artist Nationality")}
              {renderTags(item.tags)}
            </p>
          </a>
        </div>
      </div>
    </>
  )
}

export default SearchResultItem;