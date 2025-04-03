import { Suspense } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => {
    const WrappedComponent = (props) => (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

    // Assign a display name for better debugging
    WrappedComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default Loadable;
