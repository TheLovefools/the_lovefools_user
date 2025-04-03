import { RotatingLines } from "react-loader-spinner";

// ==============================|| LOADER ||============================== //
const Loader = ({marginTop ='50vh',background ='#fff',marginBottom, paddingTop="0", paddingBottom="0"}) => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop,background,marginBottom, paddingTop, paddingBottom}}>
    <RotatingLines
      visible={true}
      height="30"
      width="30"
      color="grey"
      strokeWidth="3"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default Loader;