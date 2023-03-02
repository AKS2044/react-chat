import cl from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={cl.loader}>
            <div className={cl.loader__text}>
                Loading...
            </div>
        </div>
    );
};

export default Loader;