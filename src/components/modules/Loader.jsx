import { Watch } from "react-loader-spinner";

function Loader() {
  return (
    <Watch
      visible={true}
      height="28"
      width="28"
      radius="48"
      color="#4fa94d"
      ariaLabel="watch-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Loader;
