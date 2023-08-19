export interface TeamParam {
  id: number;
  name: string;
  icon?: string;
  progress?: number; // Add the progress property
}

export const TeamsList = [
  { id: 1, name: "Tarczowniki"},
  { id: 2, name: "Orki" },
  { id: 3, name: "Komando" },
  { id: 4, name: "Ants" },
  { id: 5, name: "Gwiezda Flota" },
  { id: 6, name: "Bizony" },
  { id: 7, name: "Sharks" },
  { id: 8, name: "Osy" },
  { id: 9, name: "Koale" },
  { id: 10, name: "Avengers" },
  { id: 11, name: "Piranie" },
  { id: 12, name: "Inne / Hr, Administracja, Admini etc, 😇" },
];

export const Teams: TeamParam[] = TeamsList.map((team) => ({
  id: team.id,
  name: team.name,
  progress: 150 // Set the initial progress to 0 for each team
}));
