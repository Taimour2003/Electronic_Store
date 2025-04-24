import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home - My Store</title>
        <meta name="description" content="Welcome to the best electronic store!" />
      </Helmet>
      <h1>Welcome to the Electronic Store</h1>
    </>
  );
};

export default HomePage;
