import axios from "axios";
// Go to https://httpdump.app/ and create a new dump. Copy the URL and paste it below.

// POST request
const post = async () => {
    const res = await axios.post('https://httpdump.app/dumps/30fae58d-2ed5-4aaa-816e-33022499641b',
        {
            title: 'Aditya',
            body: 'Bar',
            userId: 1
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer my'
            }
        })
    console.log(res.data);
}
post();

// GET request
const get = async () => {
    const res = await axios.get('https://httpdump.app/dumps/30fae58d-2ed5-4aaa-816e-33022499641b?pretty=true', // ?pretty=true for pretty print
{
    headers: {
        Authorization: 'Bearer my'
    }
});
    console.log(res.data);
}
get();
