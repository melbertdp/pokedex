const Pokemon = ({ pokemon }) => {

    console.log(pokemon);

    return (
        <div>
            <p>id: {pokemon.id}</p>
            <p>{pokemon.name}</p>
            <p>{pokemon.type}</p>
        </div>
    );
}

export default Pokemon;