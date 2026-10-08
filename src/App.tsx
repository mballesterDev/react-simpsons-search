import SearchSimpsons from "./components/SearchSimpsons";

const App = () => {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 p-8">
      <h1>Buscador de Los Simpson</h1>
      <SearchSimpsons />
    </main>
  );
};

export default App;
