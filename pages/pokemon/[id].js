import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import CompetetiveDetail from '../../components/competetiveDetails';
import constants from '../../constants/constants';
import { getTypeColor } from '../../utils/utils';

const PokemonDetails = () => {

    const { query: { id } } = useRouter();

    const [pokemon, setPokemon] = useState(null);
    const [pokId, setPokId] = useState(null);
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [smogonOuDetails, setSmogonOuDetails] = useState([]);
    const [smogonLcDetails, setSmogonLcDetails] = useState([]);
    const [isPokemonFetching, setIsPokemonFetching] = useState(true);
    const [isSmogonFetching, setIsSmogonFetching] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const [
                getPokemon,
                getDetails
            ] = await Promise.all([
                await fetch(`${constants.baseUrl}pokemon/${id}`).then((res) => res.json()),
                await fetch(`${constants.POKEMON_SPECIES + id}`).then((res) => res.json()),
            ]);

            const pad = (number, length) => {
                let str = '' + number;
                while (str.length < length) {
                    str = '0' + str;
                }
                return str;
            }

            getPokemon.id = id;
            getPokemon.image = `${constants.imageBase}${pad(id, 3)}.png`;
            getPokemon.paddedId = pad(id, 3);

            setPokemon(getPokemon);
            setPokId(pad(id, 3));
            setPokemonDetails(getDetails);
            setIsPokemonFetching(false);
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {

        async function fetchData() {

            const [
                pokemonOuDetails,
                pokemonLcDetails
            ] = await Promise.all([
                await await fetch(`/api/smogon_details_ou/?data=${pokemon.name}`).then((res) => res.json()),
                await await fetch(`/api/smogon_details_lc/?data=${pokemon.name}`).then((res) => res.json()),
            ]);


            // console.log("https://smogon-usage-stats.herokuapp.com/gen8ou/bulbasaur", g);

            setSmogonOuDetails(pokemonOuDetails);
            setSmogonLcDetails(pokemonLcDetails);
            setIsSmogonFetching(false);
        }

        if (pokemon) {
            fetchData()
        }

    }, [pokemon])


    const getFlavorText = () => {
        var text = pokemonDetails.flavor_text_entries.filter(x => x.language.name == "en")[0];
        return text.flavor_text.replaceAll("\n", " ").replaceAll("\f", " ");
    }



    const getLcTier = () => {
        if (JSON.stringify(smogonLcDetails.abilities) == "{}" || smogonLcDetails?.error) {
            return <div>no record found</div>
        }

        const abilities = smogonLcDetails.abilities;
        const ability_keys = Object.keys(abilities);

        const items = smogonLcDetails.items;
        const items_keys = Object.keys(items);

        const spreads = smogonLcDetails.spreads;
        const spreads_keys = Object.keys(spreads);

        return (
            <div>
                <div>
                    <p>Abilities</p>
                    <div className='flex'>
                        {
                            ability_keys.map((x, i) => {
                                return (
                                    <p className='mr-2' key={x + i}>{x} : {abilities[x]}</p>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <p>Items</p>
                    <div className='flex'>
                        {
                            items_keys.map((x, i) => {
                                return (
                                    <p className='mr-2' key={x + i}>{x} : {items[x]}</p>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }

    if (isPokemonFetching) {
        return (
            <div>Loading</div>
        )
    }

    console.log("ou", smogonOuDetails);
    console.log("lc", smogonLcDetails);

    return (
        <div className='p-14'>
            <Link href={`/`}>
                Back
            </Link>
            <div className='flex flex-col justify-center items-center'>
                <span className='absolute text-[300px] font-bold text-slate-500 top'>#{pokId}</span>
                <Image
                    className='mt-5'
                    height={250}
                    width={250}
                    src={pokemon.image}
                    alt={pokemon.name}
                />
            </div>
            <h3 className='text-4xl uppercase text-center items-center'>{pokemon.name}</h3>

            <div className='flex justify-center items-center'>
                <div className='flex'>
                    {
                        pokemon.types.map((s, index) => {
                            var typeName = s.type.name;
                            var cls = getTypeColors(typeName);
                            return (
                                <p className={`${cls} mr-2`} key={"stat" + index}>{typeName}</p>
                            )
                        })
                    }
                </div>
            </div>

            <p className='flex justify-center items-center'>
                {
                    getFlavorText()
                }
            </p>

            <div className='flex justify-center items-center'>
                <p className='mr-3'>Abilities: </p>
                <div className='flex'>
                    {
                        pokemon.abilities.map((item, index) => {
                            var ability = item.ability.name;
                            var cls = item.is_hidden ? "text-red-300" : "";
                            return (
                                <p className={`${cls} mr-2`} key={"ability" + index}>{ability}</p>
                            )
                        })
                    }
                </div>
            </div>


            <div className='mt-5 flex justify-center items-center'>
                <div className='text-center'>
                    <p>STATS</p>
                    {
                        pokemon.stats.map((stats, index) => {
                            return (
                                <p key={"stat" + index}>{stats.stat.name}: {stats.base_stat}</p>
                            )
                        })
                    }
                </div>
            </div>

            {
                isSmogonFetching ?
                    <div>loading competetive details</div>
                    :
                    <div className="mt-5">
                        <p className="font-bold text-xl">Competetive details</p>

                        <div className='mt-5'>
                            <CompetetiveDetail tier={"Over Used"} details={smogonOuDetails} />
                        </div>

                        <div className='mt-5'>
                            <CompetetiveDetail tier={"Little Cup"} details={smogonLcDetails} />
                        </div>
                    </div>
            }

            {/* 
            <div className='flex '>
                <div className=''>
                    <Image
                        height={100}
                        width={100}
                        src={pokemon.image}
                        alt={pokemon.name}
                    />
                    <h3>{pokemon.name}</h3>
                    <div className='flex'>
                        <p className='mr-3'>Type: </p>
                        <div className='flex'>
                            {
                                pokemon.types.map((s, index) => {

                                    var typeName = s.type.name;
                                    var cls = getTypeColor(typeName);

                                    return (
                                        <p className={`${cls} mr-2`} key={"stat" + index}>{typeName}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex'>
                        <p className='mr-3'>Abilities: </p>
                        <div className='flex'>
                            {
                                pokemon.abilities.map((item, index) => {
                                    var ability = item.ability.name;
                                    var cls = item.is_hidden ? "text-red-300" : "";
                                    return (
                                        <p className={`${cls} mr-2`} key={"ability" + index}>{ability}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        {
                            getFlavorText()
                        }
                    </p>
                    <p>Stats:</p>
                    <div>
                        {
                            pokemon.stats.map((stats, index) => {
                                return (
                                    <p key={"stat" + index}>{stats.stat.name}: {stats.base_stat}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>

            </div>
            {
                isSmogonFetching ?
                    <div>loading competetive details</div>
                    :
                    <div className="mt-5">
                        <p className="font-bold text-xl">Competetive details</p>

                        <div className='mt-5'>
                            <CompetetiveDetail tier={"Over Used"} details={smogonOuDetails} />
                        </div>

                        <div className='mt-5'>
                            <CompetetiveDetail tier={"Little Cup"} details={smogonLcDetails} />
                        </div>
                    </div>
            } */}
        </div>
    );
}


const getTypeColors = (typeName) => {

    switch (typeName) {
        case "grass":
            return "text-green-600";
        case "bug":
            return "text-green-300";
        case "poison":
            return "text-purple-300";
        case "normal":
            return "text-yellow-600";
        case "fire":
            return "text-red-600";
        case "fighting":
            return "text-red-800";
        case "water":
            return "text-blue-600";
        case "flying":
            return "text-indigo-400";
        case "electric":
            return "text-yellow-300";
        case "ground":
            return "text-yellow-600";
        case "psychic":
            return "text-rose-500";
        case "rock":
            return "text-amber-800";
        case "ice":
            return "text-cyan-300";
        case "Dragon":
            return "text-indigo-500";
        case "Ghost":
            return "text-indigo-800";
        case "Dark":
            return "text-amber-900";
        case "Steel":
            return "text-gray-400";
        case "Fairy":
            return "text-rose-400";
        default:
            return "text-white";
    }
}

export default PokemonDetails;