export interface INote {
  id: string;
  date: string;
  title: string;
  text: string;
  bgColor: string | undefined;
  isInArchive: boolean | undefined;
}

export interface FormValues {
  heading: string;
  note: string;
  color?: string;
  isInArchive?: boolean | undefined;
}

export interface ISearch {
  searchText: string;
}
