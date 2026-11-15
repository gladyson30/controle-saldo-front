import { useState } from 'react';
import styles from './ConfirmacaoEstorno.module.css';
import { estornarLancamento } from '../../api/lancamentos';
import { ErroDeRequisicao } from '../../api/cliente';
import type { Lancamento } from '../../types';
import { formatarMoeda } from '../../utils/formatar';

interface ConfirmacaoEstornoProps {
  lancamento: Lancamento;
  onConfirmado: () => void;
  onCancelar: () => void;
}

export function ConfirmacaoEstorno({ lancamento, onConfirmado, onCancelar }: ConfirmacaoEstornoProps) {
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function confirmar() {
    setErro(null);
    setEnviando(true);

    try {
      await estornarLancamento(lancamento.id);
      onConfirmado();
    } catch (err) {
      setErro(err instanceof ErroDeRequisicao ? err.message : 'Erro ao estornar lançamento');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={styles.fundo} role="dialog" aria-modal="true">
      <div className={styles.dialogo}>
        <h2 className={styles.titulo}>Confirmar estorno</h2>
        <p className={styles.texto}>
          Estornar o lançamento de {formatarMoeda(lancamento.valor)}? O valor volta ao saldo
          disponível do contrato. O registro continua no histórico, marcado como estornado.
        </p>

        {erro && <p className={styles.erro}>{erro}</p>}

        <div className={styles.acoes}>
          <button type="button" className={styles.botaoCancelar} onClick={onCancelar} disabled={enviando}>
            Cancelar
          </button>
          <button type="button" className={styles.botaoConfirmar} onClick={confirmar} disabled={enviando}>
            {enviando ? 'Estornando...' : 'Estornar'}
          </button>
        </div>
      </div>
    </div>
  );
}