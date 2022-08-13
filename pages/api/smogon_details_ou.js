export default async function handler(req, res) {
    try {
        const data = await fetch(`https://smogon-usage-stats.herokuapp.com/gen8ou/${req.query.data}`);
        const foo = await data.json();
        res.status(200).json(foo)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}