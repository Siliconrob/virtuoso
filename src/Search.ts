import {APISearchSummary, ItemDetails } from "./PagedResults.ts";
// @ts-ignore
import testValues from "../test/data";

const API_V1_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

export async function getItemDetails(objectId: number, testMode: boolean = false) {
  if (testMode) {
    return testValues.item;
  }  
  const response = await fetch(`${API_V1_BASE_URL}/${objectId}`);
  const itemData = await response.json();
  const newItem: ItemDetails = {...itemData};
  return newItem;
}

export async function getPagedResults(objectIds: number[]) : Promise<ItemDetails[]> {
  const results = new Array<ItemDetails>();
  for (const z of objectIds) {
    const newItem = await getItemDetails(z);
    results.push(newItem);
  }
  return results;
}

export async function submitSearch(modified: Date, testMode: boolean = false) : Promise<APISearchSummary> {
  if (testMode) {
    return testValues.results;
  }
  const searchData = {
    metadataDate: getDateOnly(modified),
  }
  const searchParams = new URLSearchParams(searchData).toString();
  const response = await fetch(`${API_V1_BASE_URL}?${searchParams}`);
  return await response.json();
}

export function getDateOnly(inputDate: Date) {
  return inputDate != null
    ? inputDate.toISOString().split("T").shift()
    : null;
}