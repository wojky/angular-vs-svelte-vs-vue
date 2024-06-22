export type Character = {
  name: string;
  id: number;
  image: string;
  type: string;
  species: string;
  status: "Dead" | "Alive" | "unknown";
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: { name: string };
  location: { name: string };
  episode: string[];
};
