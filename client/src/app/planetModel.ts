export interface PlanetModel {
  id: number;
  file?: File | null;
  imageUrl: string;
  imageName: string;
  planetName: string;
  description: string;
  planetRadiusKM: number | null;
  planetColor: string;
  distInMillionsKM: Distances;
}

export interface Distances {
  fromSun: number | null;
  fromEarth: number | null;
}
