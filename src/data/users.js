const users = [
  {
    id: 1,
    name: "Andrés",
    lastName: "Guerrero",
    displayName: "Andrés",
  },
  {
    id: 2,
    name: "María",
    lastName: "Guerrero",
    displayName: "María",
  },
];

const randomUsers = () => users.sort(() => 0.5 - Math.random());

export { randomUsers };
