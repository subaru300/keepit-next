export interface INote {
  id: string;
  date: string;
  title: string;
  text: string;
  bgColor: string | undefined;
  isInArchive: boolean;
}

export interface ISearch {
  searchText: string;
}
