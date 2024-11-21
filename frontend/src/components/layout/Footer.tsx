const TeamWork = () => (
  <img
    width={40}
    className="rounded-sm"
    src="https://media0.giphy.com/media/dSetNZo2AJfptAk9hp/giphy.gif?cid=6c09b952rv2mww534z02x6pt4g8wuw4ubomi4vddte0q26bn&ep=v1_gifs_search&rid=giphy.gif&ct=g"
  />
);

export const Footer = () => {
  return (
    <footer className="bg-slate-200 container mx-auto p-4 flex justify-center items-center gap-3">
      <TeamWork />
      <p className="text-center font-bold">Group 13</p>
      <TeamWork />
    </footer>
  );
};
