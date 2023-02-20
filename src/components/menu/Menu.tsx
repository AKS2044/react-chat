import cl from './Menu.module.scss';
import photo from '../../images/Rick.png';

const Menu = () => {
    const persons = [
        {photo: photo, nick: 'Valera Boudman', online: true},
        {photo: photo, nick: 'Semen Boudman', online: true},
        {photo: photo, nick: 'Seva Boudman', online: false},
        {photo: photo, nick: 'Valera Boudman', online: true},
        {photo: photo, nick: 'Pukich Boudman', online: true},
        {photo: photo, nick: 'Valera Puf', online: false},
        {photo: photo, nick: 'Vandam Boudman', online: false}
    ]
    return (
        <div className={cl.menu}>
            <div>
                {persons.map((p, index) => 
                <div key={index} className={cl.menu__person}>
                    <img src={p.photo} alt='' title='' className={cl.menu__person__photo} />
                    <div>
                        <div className={cl.menu__person__nick}>{p.nick}</div>
                        <div className={cl.menu__person__online}>{p.online ? 'online': 'offline'}</div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Menu;