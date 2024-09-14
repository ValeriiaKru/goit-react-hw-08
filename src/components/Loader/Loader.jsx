
import { FallingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div>
            <FallingLines
  color="#53FFB0"
  width="70"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
        </div>

    );
};

export default Loader;