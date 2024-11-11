export interface IDirectusFile {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  folder: string | null;
  uploaded_by: string;
  created_on: Date;
  modified_by: string | null;
  modified_on: Date;
  charset: string | null;
  filesize: string;
  width: number | null;
  height: number | null;
  duration: number | null;
  embed: boolean | null;
  description: string | null;
  location: string | null;
  tags: string | null;
  metadata: {};
  focal_point_x: string | null;
  focal_point_y: string | null;
  tus_id: string | null;
  tus_data: Date | null;
  uploaded_on: Date;
}
