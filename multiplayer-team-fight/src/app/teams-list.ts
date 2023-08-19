export interface TeamParam {
  id: number;
  name: string;
  icon?: string;
  progress: number; // Add the progress property
}

export const TeamsList = [
  {id: 0, name: "Tarczowniki"},
  {id: 1, name: "Orki"},
  {id: 2, name: "Komando"},
  {id: 3, name: "Ants"},
  {id: 4, name: "Gwiezda Flota"},
  {id: 5, name: "Bizony"},
  {id: 6, name: "Sharks"},
  {id: 7, name: "Osy"},
  {id: 8, name: "Koale"},
  {id: 9, name: "Avengers"},
  {id: 10, name: "Piranie"},
  {id: 11, name: "Inne / Hr, Administracja, Admini etc, 😇"}
];

export const Teams: TeamParam[] = TeamsList.map((team) => ({
  id: team.id,
  name: team.name,
  progress: 5 // Set the initial progress to 0 for each team
}));
