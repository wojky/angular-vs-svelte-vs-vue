export type CharactersPageFilters = {
  searchTerm: string;
  status: Lowercase<"Dead" | "Alive" | "unknown" | "">;
};
