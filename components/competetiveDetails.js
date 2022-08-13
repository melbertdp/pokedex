const CompetetiveDetail = ({ tier, details }) => {

    const getObjectKeys = (data) => {

        const value = data;
        const keys = Object.keys(value);

        return { value, keys }
    }

    const prepareSpreads = (spreads) => {

        var value = [];

        spreads.keys.map((x, i) => {
            var obj = {};

            obj.iv = x;

            var keyvals = [];

            for (var key in spreads.value[x]) {
                if (x != "Other") {
                    keyvals.push({ "key": key, "value": spreads.value[x][key] })
                }
            }

            if (x === "Other") {
                keyvals.push({ "key": null, "value": spreads.value[x] })
            }

            obj.values = keyvals;
            value.push(obj);
        });

        return value;
    }

    const tierDetails = () => {

        if (JSON.stringify(details.abilities) == "{}" || details?.error) {
            return <div>no record found</div>
        }

        const abilities = getObjectKeys(details.abilities);
        const items = getObjectKeys(details.items);
        const moves = getObjectKeys(details.moves);
        const spreads = prepareSpreads(getObjectKeys(details.spreads));

        return (
            <div>
                <div className="mt-5">
                    <p className="font-bold text-xl">Abilities:</p>
                    <div className='flex'>
                        {
                            abilities.keys.map((x, i) => {
                                return (
                                    <p className='mr-2' key={x + i}>{x} : {abilities.value[x]}</p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <p className="font-bold text-xl">Items</p>
                    <div className=''>
                        {
                            items.keys.map((x, i) => {
                                return (
                                    <p className='mr-2' key={x + i}>{x} : {items.value[x]}</p>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <p className="font-bold text-xl">IV Spreads</p>
                    <div className=''>
                        {
                            spreads.map((spread, index) => (
                                <div className="mt-3" key={index}>
                                    <h2>{spread.iv}</h2>

                                    {spread.values.map((spreadval, index) => (
                                        <div key={index}>
                                            <p>{spreadval.key == null ? spread.iv : spreadval.key} : {spreadval.value}</p>
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <p className="font-bold text-xl">Moves</p>
                    <div className=''>
                        {
                            moves.keys.map((x, i) => {
                                return (
                                    <p className='mr-2' key={x + i}>{x} : {moves.value[x]}</p>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>
            <p className="font-bold font-lg">{tier} {JSON.stringify((details.abilities) == "{}" || details?.error) && details.usage}</p>
            {tierDetails()}
        </div>
    );
}

export default CompetetiveDetail;