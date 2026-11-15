import styles from './DashboardPage.module.css';
import { CardSaldo } from '../../components/CardSaldo/CardSaldo';
import { FormContrato } from '../../components/FormContrato/FormContrato';
import type { SaldoConsolidado } from '../../types';
import { formatarMoeda } from '../../utils/formatar';

interface DashboardPageProps {
  saldo: SaldoConsolidado;
  onSelecionar: (contratoId: string) => void;
  onCriado: () => void;
}

export function DashboardPage({ saldo, onSelecionar, onCriado }: DashboardPageProps) {
  return (
    <main className="container">
      <header className={styles.cabecalho}>
        <h1>Controle de saldo de contratos</h1>
        <p>Visão consolidada e alertas por contrato</p>
      </header>

      <section className={styles.resumo}>
        <div className={styles.metrica}>
          <p className={styles.rotulo}>Total contratado</p>
          <p className={styles.valor}>{formatarMoeda(saldo.valorTotalContratado)}</p>
        </div>
        <div className={styles.metrica}>
          <p className={styles.rotulo}>Total lançado</p>
          <p className={styles.valor}>{formatarMoeda(saldo.totalLancado)}</p>
        </div>
        <div className={`${styles.metrica} ${styles.destaque}`}>
          <p className={styles.rotulo}>Saldo disponível</p>
          <p className={styles.valor}>{formatarMoeda(saldo.saldoDisponivel)}</p>
        </div>
      </section>

      <FormContrato onCriado={onCriado} />

      <h2 className={styles.titulo}>Contratos</h2>

      {saldo.contratos.length === 0 ? (
        <p className={styles.vazio}>Nenhum contrato cadastrado ainda.</p>
      ) : (
        <section className={styles.grade}>
          {saldo.contratos.map((c) => (
            <CardSaldo key={c.contratoId} saldo={c} onSelecionar={onSelecionar} />
          ))}
        </section>
      )}
    </main>
  );
}