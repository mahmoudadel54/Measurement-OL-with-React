import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center">
      {/* <h1>Home Page</h1> */}
      <div>

      <Link to={"/ol"} className="m-2 btn btn-primary">Map with Measurement using Pure Ol</Link>
      <Link to={"/olext"} className="m-2 btn btn-danger">Map with Measurement using Ol EXT</Link>
      </div>
    </div>
  );
}

export default Home;
