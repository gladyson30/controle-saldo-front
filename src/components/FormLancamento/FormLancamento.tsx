import { useState } from 'react';
import styles from './FormLancamento.module.css';
import { editarLancamento, registrarLancamento } from '../../api/lancamentos';
import { ErroDeRequisicao } from '../../api/cliente';
import type { Lancamento } from '../../types';

interface FormLancamentoProps {
  contratoId: string;
  lancamentoEmEdicao: Lancamento | null;
  onSalvo: () => void;
  onCancelarEdicao: () => void;
}

export function FormLancamento({
  contratoId,
  lancamentoEmEdicao,
  onSalvo,
  onCancelarEdicao,
}: FormLancamentoProps) {
  const [data, setData] = useState(lancamentoEmEdicao?.data ?? '');
  const [valor, setValor] = useState(
    lancamentoEmEdicao ? String(lancamentoEmEdicao.valor) : ''
  );
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const editando = lancamentoEmEdicao !== null;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      if (lancamentoEmEdicao) {
        await editarLancamento(lancamentoEmEdicao.id, { data, valor: Number(valor) });
      } else {
        await registrarLancamento({ contratoId, data, valor: Number(valor) });
      }
      onSalvo();
    } catch (err) {
      setErro(err instanceof ErroDeRequisicao ? err.message : 'Erro ao salvar lançamento');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className={styles.form}>
      <h2 className={styles.titulo}>{editando ? 'Editar lançamento' : 'Novo lançamento'}</h2>

      <label className={styles.campo}>
        Data
        <input
          className={styles.input}
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </label>

      <label className={styles.campo}>
        Valor
        <input
          className={styles.input}
          type="number"
          step="0.01"
          min="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
      </label>

      <div className={styles.acoes}>
        <button type="submit" className={styles.botao} disabled={enviando}>
          {enviando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Registrar'}
        </button>

        {editando && (
          <button type="button" className={styles.botaoCancelar} onClick={onCancelarEdicao}>
            Cancelar
          </button>
        )}
      </div>

      {erro && <p className={styles.erro}>{erro}</p>}
    </form>
  );
}