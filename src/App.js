import { useRef, useState, useEffect } from "react";
import Thumbnail from "./components/Thumbnail/Thumbnail.component.tsx";
import Loading from "./components/Loading/Loading.component.tsx";

const PAGE_SIZE = 12;

const fetchPokemonPage = async (offset = 0) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  const data = await response.json();
  return data.results;
};

const PokemonsList = () => {
  const [pokemons, setPokemons] = useState([]);
  const endOfPageRef = useRef();
  const [isPending, setIsPending] = useState(false);
  
  useEffect(() => {
    setIsPending(true);
    fetchPokemonPage().then((firstPageOfPokemons) => {
      setPokemons(firstPageOfPokemons);
      setIsPending(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const endOfPage = entries[0];
      if (endOfPage.isIntersecting && !isPending) {
        setIsPending(true);
        //* A dummy timeout to see it actually is working as expected
        setTimeout(() => {
          fetchPokemonPage(pokemons.length).then((newPageOfPokemons) => {
            setPokemons((prevPokemons) => [...prevPokemons, ...newPageOfPokemons]);
            setIsPending(false);
          });
        }, [500])
      }
    });
    
    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [isPending, pokemons.length]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 250px)",
          margin: "auto",
          maxWidth: "1000px",
        }}
      >
        {pokemons.map((pokemon) => (
          <Thumbnail key={pokemon.name} name={pokemon.name} />
        ))}
        <div ref={endOfPageRef} style={{ height: '5px' }}></div>
      </div>
      {isPending && <Loading />}
    </div>
  );
};

export default PokemonsList;
