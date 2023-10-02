export interface ITrainingItem {
  title: string,
  slug: string,
  roles: string[],
  link: string,
  updated: Date,
  order: number,
  duplicateNotice: string,
  updatedFormatted: string,
  action: string,
  optional: boolean,
  roleSpecific: boolean
}