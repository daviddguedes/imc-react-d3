import { useRef } from 'react';
import styles from '../styles/Home.module.css';

const TooltipComponent = ({ d, width, height }) => {
    const tooltipRef = useRef(null);

    const calcResult = value => {
        if (+value <= 16.9) {
            return 'VOCÊ ESTÁ MUITO ABAIXO DO PESO';
        } else if (+value > 16.9 && +value <= 18.4) {
            return 'VOCÊ ESTÁ ABAIXO DO PESO';
        } else if (+value > 18.4 && +value <= 24.9) {
            return 'PESO NORMAL';
        } else if (+value > 24.9 && +value <= 29.9) {
            return 'ACIMA DO PESO';
        } else if (+value > 29.9 && +value <= 34.9) {
            return 'OBESIDADE GRAU I';
        } else if (+value > 34.9 && +value <= 40) {
            return 'OBESIDADE GRAU II';
        } else {
            return 'OBESIDADE GRAU III';  
        }
    }

    const divRect = tooltipRef.current ? [
        tooltipRef.current.clientWidth,
        tooltipRef.current.clientHeight,
    ] : [0, 0];

    if ((d.clientX + divRect[0]) >= width) {
        d.clientX = d.clientX - divRect[0] - 100;
    }

    if ((d.clientY + divRect[1]) >= height) {
        d.clientY = d.clientY - divRect[1] - 10; 
    }

    return (
        <div
            ref={tooltipRef}
            className={styles.tooltip_container}
            style={{
                opacity: d.opacity,
                left: `${d.clientX + 28}px`,
                top: `${d.clientY}px`
            }}
        >
            <h3>Altura: {d.variable}cm</h3>
            <h3>Peso: {d.group}kg</h3>
            <h3>Seu IMC: {d.value}kg/m²</h3>
            <h3>{calcResult(d.value)}</h3>
        </div>
    )
}

export default TooltipComponent;