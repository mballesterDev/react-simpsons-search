import React, { useEffect, useState } from "react";
import ButtonIndex from "./ButtonIndex";

const SearchSimpsons = () => {
  const baseAPI = "https://thesimpsonsapi.com/api/characters";
  const imageBase = "https://cdn.thesimpsonsapi.com/500"; 
  const numPaginasTotal = 60;

  const [API, setApi] = useState(baseAPI);
  const [charactersList, setCharactersList] = useState([]);
  const [filteredLIst, setFilteredList] = useState(charactersList);
  const [characterSearchedI, setCharacterSearchedI] = useState("");
  const [characterFound, setCharacterFound] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setIsActive] = useState(false);

  // Cargar personajes cuando cambia la API
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setCharactersList(data.results))
      .catch((err) => console.log(err));

  }, [API]);


  useEffect(()=> {
    setFilteredList(charactersList)
  },[charactersList])

  // Buscar personaje por nombre
  const searchByName = (cName) => {
    setCharacterSearchedI("");

    if (!cName.trim()) {
      setCharacterFound(null);
      alert("⚠️ Escribe un nombre para buscar");
      return;
    }

    const searchedCharacter = charactersList.find(
      (c) => c.name.toLowerCase().trim().split(" ")[0] === cName.toLowerCase().trim()
    );

    if (searchedCharacter) {
      setCharacterFound(searchedCharacter);
    } else {
      setCharacterFound(null);
      alert("❌ No existe ese personaje");
    }
  };


  const filterByPage = (index) => {
    setApi(`${baseAPI}?page=${index}`);
    setCurrentPage(index);


  };

  const filterCharacters = (filtro) => {
  if (filtro === "all") {
    setFilteredList(charactersList);
  } else if (filtro === "alive") {  // ← Minúscula
    const listaVivos = charactersList.filter(c => c.status === "Alive");
    setFilteredList(listaVivos);
  } else if (filtro === "deceased") {  // ← Minúscula
    const listaMuertos = charactersList.filter(c => c.status === "Deceased")
    setFilteredList(listaMuertos);
  }
}
  


  // Limpiar búsqueda
  const clearSearch = () => {
    setCharacterFound(null);
    setCharacterSearchedI("");
    setApi(baseAPI);
  };


  return (
    <>
      {/* Buscador */}
      <div className="flex gap-4 p-20 mx-auto">
        <input
          type="text"
          className="outline-1"
          value={characterSearchedI}
          onChange={(e) => setCharacterSearchedI(e.target.value)}
          placeholder="Busca por nombre..."
        />
        <button onClick={() => searchByName(characterSearchedI)}>
          Buscar
        </button>
        <button onClick={()=> filterCharacters("all")}>All</button>
        <button onClick={()=> filterCharacters("alive")}>Alive</button>
        <button onClick={()=> filterCharacters("deceased")}>Deceased</button>
        {characterFound && (
          <button onClick={clearSearch}>
            Limpiar búsqueda
          </button>
        )}
      </div>

      {/* Personaje encontrado */}
      {characterFound && (
        <div className="border flex flex-col gap-3 items-center p-4 m-4 rounded">
          <h2>{characterFound.name}</h2>
          <p>ID: {characterFound.id}</p>
          <p>Edad: {characterFound.age || "Desconocida"}</p>
          <p>Género: {characterFound.gender}</p>
          <p>Ocupación: {characterFound.occupation}</p>
          <p>Estado: {characterFound.status}</p>
          <img
            src={`${imageBase}${characterFound.portrait_path}`}
            alt={characterFound.name}
            className="w-48 h-48 object-cover"
          />
        </div>
      )}

      {/* Lista de personajes */}
      <div className="flex flex-wrap justify-between w-[90%] gap-4">
        {filteredLIst.map((c) => (
          <div key={c.id} className="border p-4 rounded w-64">
            <img
              src={`${imageBase}${c.portrait_path}`}
              alt={c.name}
              className="w-full h-48 object-cover"
            />
            <h2>{c.name}</h2>
            <p>ID: {c.id}</p>
            <p>Estado: {c.status}</p>
            <p>Ocupación: {c.occupation}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Array.from({ length: numPaginasTotal }, (_, i) => (
          <ButtonIndex 
            key={i +1} 
            numPagina={i + 1} 
            filterByPage={() => filterByPage(i + 1)}
            currentPage={currentPage}
          />
        ))}
      </div>
      <span className="mx-auto my-5">Current Page: {currentPage}</span>
    </>
  );
};

export default SearchSimpsons;