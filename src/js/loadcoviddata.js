let data;
const url = 'https://api.covid19api.com/summary';
async function loadData() {
    let request = await fetch(url);
    data = await request.json();
    console.log(data);
    return await data;
}

export default data;