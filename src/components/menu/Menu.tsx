import cl from './Menu.module.scss';

type MenuProps = {
    items: {
        id: string,
        email: string,
        userName: string,
        pathPhoto: string,
        dateReg: string
    }[]
}

const Menu: React.FC<MenuProps> = (props) => {
    return (
        <div className={cl.menu}>
            <div className={cl.menu__items}>
                {props.items.map((p) => 
                <div key={p.id} className={cl.menu__person}>
                    <img src={`https://localhost:7275/${p.pathPhoto}`} alt="User" title='Photo' className={cl.menu__person__photo} />
                    <div>
                        <div className={cl.menu__person__nick}>{p.userName}</div>
                        <div className={cl.menu__person__online}>online</div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Menu;