export const getTypeColor = (typeName) => {

    switch (typeName) {
        case "grass":
            return "bg-green-600";
        case "bug":
            return "bg-green-300";
        case "poison":
            return "bg-purple-300";
        case "normal":
            return "bg-yellow-600";
        case "fire":
            return "bg-red-600";
        case "fighting":
            return "bg-red-800";
        case "water":
            return "bg-blue-600";
        case "flying":
            return "bg-indigo-400";
        case "electric":
            return "bg-yellow-300";
        case "ground":
            return "bg-yellow-600";
        case "psychic":
            return "bg-rose-500";
        case "rock":
            return "bg-amber-800";
        case "ice":
            return "bg-cyan-300";
        case "Dragon":
            return "bg-indigo-500";
        case "Ghost":
            return "bg-indigo-800";
        case "Dark":
            return "bg-amber-900";
        case "Steel":
            return "bg-gray-400";
        case "Fairy":
            return "bg-rose-400";
        default:
            return "bg-white";
    }
}