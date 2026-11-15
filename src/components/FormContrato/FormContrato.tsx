import { useState } from 'react';
import styles from './FormContrato.module.css';
import { criarContrato } from '../../api/contratos';
import { ErroDeRequisicao } from '../../api/cliente';

interface FormContratoProps {
  onCriado: () => void;
}

export function FormContrato({ onCriado }: FormContratoProps) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await criarContrato({
        nome,
        valorContratado: Number(valor),
        dataInicio,
      });
      setNome('');
      setValor('');
      setDataInicio('');
      onCriado();
    } catch (err) {
      setErro(err instanceof ErroDeRequisicao ? err.message : 'Erro ao cadastrar contrato');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className={styles.form}>
      <h2 className={styles.titulo}>Novo contrato</h2>

      <label className={styles.campo}>
        Nome
        <input
          className={styles.input}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          maxLength={150}
        />
      </label>

      <label className={styles.campo}>
        Valor contratado
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

      <label className={styles.campo}>
        Data de início
        <input
          className={styles.input}
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          required
        />
      </label>

      <button type="submit" className={styles.botao} disabled={enviando}>
        {enviando ? 'Salvando...' : 'Cadastrar'}
      </button>

      {erro && <p className={styles.erro}>{erro}</p>}
    </form>
  );
}