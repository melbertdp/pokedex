import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import PokeCard from './pokemonCards';

import constants from '../constants/constants';

const Dex = () => {

    const [pokemon, setPokemon] = useState([]);
    const [isPokemonFetching, setIsPokemonFetching] = useState(true);

    useEffect(() => {

        async function fetchData() {
            const res = await fetch(`${constants.baseUrl}pokemon?limit=151`);
            const { results } = await res.json();

            const pad = (number, length) => {
                let str = '' + number;
                while (str.length < length) {
                    str = '0' + str;
                }
                return str;
            }

            const mons = results.map((pokmon) => {
                var link = pokmon.url;
                var q = link.substr(0, link.length - 1).split("/");
                var id = pad(q[q.length - 1], 3);

                pokmon.id = q[q.length - 1];
                pokmon.paddedId = id;
                pokmon.image = `${constants.imageBase}${id}.png`;

                return pokmon;
            })

            console.log("mons", mons);

            setPokemon(results);
            setIsPokemonFetching(false);
        }

        fetchData();

    }, []);

    if (isPokemonFetching)
        return (
            <div>Loading</div>
        )

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {
                pokemon.map((poke) => {
                    return (
                        <div key={poke.id}>
                            <Link href={`pokemon/${poke.id}`}>
                                <a className="border p-4 border-gray my-2 bg-slate-700 text-white flex items-center flex-col">
                                    <Image
                                        height={80}
                                        width={80}
                                        src={poke.image}
                                        alt={poke.name}
                                    />
                                    <span className="mt-3">{poke.name}</span>
                                </a>
                            </Link>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default Dex