export class ItemDetails {
  objectID: number = 0;
  primaryImageSmall: string = "";
  title: string = "";
  objectDate: string = "";
  department: string = "";
  artistRole: string = "";
  artistDisplayName: string = "";
  artistNationality: string = "";
  tags: Array<object> = new Array<object>();
  primaryImage: string = "";
  objectURL: string = "";
}

export class PagedResult {
  //items: Array<ItemDetails> = new Array<ItemDetails>();
  ids: Array<number> = new Array<number>();
  itemsPerPage: number = import.meta.env.VITE_APP_NODE_ITEMS_PER_PAGE || 5;
  currentPage: number = 1;
}

export class APISearchSummary {
  total: number = 0;
  objectIDs: Array<number> = new Array<number>();
}