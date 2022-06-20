export interface CollectionData {
  center: string;
  title: string;
  nasa_id: string;
  date_created: string;
  media_type: string;
  description: string;
  description508: string;
  keywords: Array<string>;
  secondary_creator: string;
}

export interface CollectionLink {
  href: string;
  rel: string;
  render: string;
}


export interface Collection {
  href: string;
  data: CollectionData[];
  links: CollectionLink[];
}

export interface ApiCollection {
  version: string;
  href: string;
  items: Collection[];
}

export interface ApiSearchResponse {
  collection: ApiCollection;
  statusCode: number;
}