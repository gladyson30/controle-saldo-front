import styles from './CardSaldo.module.css';
import type { Saldo } from '../../types';
import { formatarMoeda, formatarPercentual } from '../../utils/formatar';
import { AlertaBadge } from '../AlertaBadge/AlertaBadge';

interface CardSaldoProps {
  saldo: Saldo;
  onSelecionar: (contratoId: string) => void;
}

export function CardSaldo({ saldo, onSelecionar }: CardSaldoProps) {
  const largura = Math.min(saldo.percentualConsumido, 100);

  return (
    <article className={styles.card} onClick={() => onSelecionar(saldo.contratoId)}>
      <div className={styles.topo}>
        <h3 className={styles.nome}>{saldo.nome}</h3>
        <AlertaBadge alerta={saldo.alerta} />
      </div>

      <dl className={styles.valores}>
        <div>
          <dt>Contratado</dt>
          <dd>{formatarMoeda(saldo.valorContratado)}</dd>
        </div>
        <div>
          <dt>Lançado</dt>
          <dd>{formatarMoeda(saldo.totalLancado)}</dd>
        </div>
        <div>
          <dt>Disponível</dt>
          <dd>{formatarMoeda(saldo.saldoDisponivel)}</dd>
        </div>
        <div>
          <dt>Vigência</dt>
          <dd>{formatarPercentual(saldo.percentualVigenciaDecorrida)}</dd>
        </div>
      </dl>

      <div className={styles.progresso}>
        <div className={styles.trilho}>
          <div className={`${styles.barra} ${styles[saldo.alerta]}`} style={{ width: `${largura}%` }} />
        </div>
        <span>{formatarPercentual(saldo.percentualConsumido)} consumido</span>
      </div>
    </article>
  );
}