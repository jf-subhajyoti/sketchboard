import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import styles from './index.module.css'
import { MENU_ITEMS } from '@/constants';
import { menuItemClicked } from '@/slice/menuSlice';

const Menu = () => {
    const dispatch = useDispatch();
    const { activeMenuItem } = useSelector(state => state.menu)
    const handleMenuItemClick = (item) => dispatch(menuItemClicked(item));
    return (
        <div className={styles.menuContainer}>
            <div className={cx(styles.iconWrapper, {[styles.active]: activeMenuItem === MENU_ITEMS.PENCIL})} onClick={() => handleMenuItemClick(MENU_ITEMS.PENCIL)}>
                <FontAwesomeIcon className={styles.icon} icon={faPencil} />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })} onClick={() => handleMenuItemClick(MENU_ITEMS.ERASER)}>
                <FontAwesomeIcon className={styles.icon} icon={faEraser} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon className={styles.icon} icon={faRotateLeft} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon className={styles.icon} icon={faRotateRight} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon className={styles.icon} icon={faFileArrowDown} />
            </div>
        </div>
    )
};

export default Menu;