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
        return "../src/assets/no-image.svg";
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