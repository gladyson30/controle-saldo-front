import styles from './TabelaLancamentos.module.css';
import type { Lancamento } from '../../types';
import { formatarMoeda } from '../../utils/formatar';

interface TabelaLancamentosProps {
  lancamentos: Lancamento[];
  onEditar: (lancamento: Lancamento) => void;
  onEstornar: (lancamento: Lancamento) => void;
}

export function TabelaLancamentos({ lancamentos, onEditar, onEstornar }: TabelaLancamentosProps) {
  if (lancamentos.length === 0) {
    return <p className={styles.vazio}>Nenhum lançamento neste contrato.</p>;
  }

  return (
    <table className={styles.tabela}>
      <thead className={styles.cabecalho}>
        <tr>
          <th>Data</th>
          <th>Valor</th>
          <th>Status</th>
          <th className={styles.acoes}></th>
        </tr>
      </thead>
      <tbody>
        {lancamentos.map((l) => {
          const estornado = l.status === 'ESTORNADO';

          return (
            <tr
              key={l.id}
              className={`${styles.linha} ${estornado ? styles.estornada : ''}`}
            >
              <td className={styles.data}>
                {new Date(`${l.data}T00:00:00`).toLocaleDateString('pt-BR')}
              </td>
              <td className={styles.valor}>{formatarMoeda(l.valor)}</td>
              <td>
                <span className={estornado ? styles.badgeEstornado : styles.badgeAtivo}>
                  {estornado ? 'Estornado' : 'Ativo'}
                </span>
              </td>
              <td className={styles.acoes}>
                {!estornado && (
                  <div className={styles.botoes}>
                    <button type="button" className={styles.botaoEditar} onClick={() => onEditar(l)}>
                      Editar
                    </button>
                    <button type="button" className={styles.botaoEstornar} onClick={() => onEstornar(l)}>
                      Estornar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}