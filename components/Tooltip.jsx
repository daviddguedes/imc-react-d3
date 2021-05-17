import styles from '../styles/Home.module.css';

const TooltipComponent = ({ d }) => {
    return (
        <div
            className={styles.tooltip_container}
            style={{ opacity: d.opacity, left: `${d.clientX + 28}px`, top: `${d.clientY}px` }}
        >
            <h3>Altura: {d.variable}</h3>
            <h3>Peso: {d.group}</h3>
            <h3>Seu IMC: {d.value}</h3>
        </div>
    )
}

export default TooltipComponent;