import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center">
      {/* <h1>Home Page</h1> */}
      <div>

      <Link to={"/MapwithClass"} className="m-2 btn btn-primary">Map with Class Coomponent</Link>
      <Link to={"/MapwithFunction"} className="m-2 btn btn-danger">Map with Function Coomponent</Link>
      </div>
    </div>
  );
}

export default Home;
