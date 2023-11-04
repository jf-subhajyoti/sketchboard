import { useSelector, useDispatch } from "react-redux";
import { useEffect, useLayoutEffect, useRef } from "react";

import { actionItemClicked } from "@/slice/menuSlice";

import { MENU_ITEMS } from "@/constants";

const Board = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const drawHistoryPointer = useRef(0); 
    
    const { activeMenuItem, activeActionItems } = useSelector(state => state.menu);
    const {color, size} = useSelector(state => state.toolbox[activeMenuItem]);
    

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const setImageToCanvas = () => {
            const imageData = drawHistory.current[drawHistoryPointer.current];
            context.putImageData(imageData, 0, 0);
        }

        if (activeActionItems === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();
            const anchorElem = document.createElement('a');
            anchorElem.href = URL;
            anchorElem.download = 'sketch.png';
            anchorElem.click();
        }
        else if (activeActionItems === MENU_ITEMS.UNDO) {
            if(drawHistoryPointer.current > 0) drawHistoryPointer.current -= 1;
            setImageToCanvas();
        }
        else if (activeActionItems === MENU_ITEMS.REDO) {
            if (drawHistoryPointer.current < drawHistory.current.length -1) drawHistoryPointer.current += 1;
            setImageToCanvas();
        }
        dispatch(actionItemClicked(null)); 
    }, [activeActionItems, dispatch])

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const changeConfig = () => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }

        changeConfig();
    }, [color, size]);

    useLayoutEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x, y) => {
            context.beginPath();
            context.moveTo(x, y);
        }

        const movePath = (x, y) => {
            context.lineTo(x, y);
            context.stroke();
        }

        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);
        };

        const handleMouseMove = (e) => {
            if(!shouldDraw.current) return;
            movePath(e.clientX, e.clientY)
        }
        const handleMouseUp = (e) => {
            shouldDraw.current = false;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            drawHistoryPointer.current = drawHistory.current.length - 1;
        }

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);

        }
    }, [])
    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Board;