import styles from './AlertaBadge.module.css';
import type { AlertaSaldo } from '../../types';

const rotulos: Record<AlertaSaldo, string> = {
  NORMAL: 'Saudável',
  PROXIMO_DO_LIMITE: 'Próximo do limite',
  BAIXO_CONSUMO: 'Baixo consumo',
};

export function AlertaBadge({ alerta }: { alerta: AlertaSaldo }) {
  return <span className={`${styles.badge} ${styles[alerta]}`}>{rotulos[alerta]}</span>;
}