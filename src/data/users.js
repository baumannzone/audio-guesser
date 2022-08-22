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

const createUserData = ({ user, responses, points, room, totalAudios }) => {
  const { uid, displayName, email, photoURL } = user.user;
  return {
    user: { uid, displayName, email, photoURL },
    responses,
    points,
    room,
    createdAt: new Date(),
    totalAudios,
  };
};

export { randomUsers, createUserData };
