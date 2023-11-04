
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import {COLORS, MENU_ITEMS} from '../../constants';
import { changeBrushSize, changeColor } from '@/slice/toolboxSlice';

import styles from './index.module.css';

const Toolbox = () => {
    const dispatch = useDispatch();
    const { activeMenuItem } = useSelector(state => state.menu);
    const { color, size } = useSelector(state => state.toolbox[activeMenuItem])

    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = (activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER);

    const updateSize = (e) => {
        dispatch(changeBrushSize({
            item: activeMenuItem,
            size: e.target.value,
        }))
    };

    const updateColor = (newColor) => {
        dispatch(changeColor({
            item: activeMenuItem,
            color: newColor
        }))
    }
    return (
        <div className={styles.toolboxContainer}>
            {
                showStrokeToolOption && 
                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Stroke Color</h4>
                    <div className={styles.itemContainer}>
                        <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLACK})} onClick={() => {updateColor(COLORS.BLACK)}} style={{ backgroundColor: COLORS.BLACK}} />
                        <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLUE})} onClick={() => {updateColor(COLORS.BLUE)}} style={{ backgroundColor: COLORS.BLUE}} />
                        <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.RED})} onClick={() => {updateColor(COLORS.RED)}} style={{ backgroundColor: COLORS.RED}} />
                        <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.ORANGE})} onClick={() => {updateColor(COLORS.ORANGE)}} style={{ backgroundColor: COLORS.ORANGE}} />
                        <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.YELLOW})} onClick={() => {updateColor(COLORS.YELLOW)}} style={{ backgroundColor: COLORS.YELLOW}} />
                        <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.GREEN})} onClick={() => {updateColor(COLORS.GREEN)}} style={{ backgroundColor: COLORS.GREEN}} />
                        <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.WHITE})} onClick={() => {updateColor(COLORS.WHITE)}} style={{ backgroundColor: COLORS.WHITE}} />
                    </div>
                </div>
            }
            {
                showBrushToolOption && 
                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Brush Size</h4>
                    <div className={styles.itemContainer}>
                        <input type='range' min={1} max={10} step={1} onChange={updateSize} value={size} />
                    </div>
                </div>
            }
        </div>
    )
};

export default Toolbox;