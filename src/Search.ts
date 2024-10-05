import {APISearchSummary, ItemDetails } from "./PagedResults.ts";
// @ts-ignore
import testValues from "../test/data";
import {get, set} from "./Cache.ts";

const API_V1_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

let controller: AbortController;
let requestSignal: AbortSignal;

export function isProduction() {
  return (import.meta.env.VITE_APP_NODE_ENV || "production" !== "production");
}

export async function getItemDetails(objectId: number, testMode: boolean = false) {
  if (testMode) {
    return testValues.item;
  }
  const cachedResult = await get(objectId) as ItemDetails;
  if (cachedResult !== undefined && cachedResult !== null) {
    return cachedResult;
  }
  const response = await fetch(`${API_V1_BASE_URL}/${objectId}`, {signal: requestSignal});
  const itemData = await response.json();
  const newItem: ItemDetails = {...itemData};
  await set(newItem, objectId);
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

function setupAbortSignal(): void {
  if (controller !== null && controller !== undefined) {
    console.log("Stop inprocess requests");
    controller.abort();
  }

  controller = new AbortController();
  requestSignal = controller.signal;
}

export async function submitSearch(modified: Date, testMode: boolean = false) : Promise<APISearchSummary> {
  if (testMode) {
    return testValues.results;
  }
  const searchData = {
    metadataDate: getDateOnly(modified),
  }
  setupAbortSignal();
  
  // @ts-ignore
  const searchParams = new URLSearchParams(searchData).toString();
  const response = await fetch(`${API_V1_BASE_URL}?${searchParams}`, {signal: requestSignal});
  return await response.json();
}

export function getDateOnly(inputDate: Date) : string | undefined | number {
  return inputDate != null
    ? inputDate.toISOString().split("T").shift()
    : "";
}