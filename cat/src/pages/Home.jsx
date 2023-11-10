import React from 'react'

 function Home() {
    const [catData, setCatData] = useState(null);
    const fetchData = () => {
      axios
        .get(
          "https://api.thecatapi.com/v1/images/search?format=json&limit=10",
          catOptions
        )
        .then((response) => setCatData(response.data))
        .catch((error) => console.error("error during fetching"));
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div>Home</div>
  )
}
export default Home;