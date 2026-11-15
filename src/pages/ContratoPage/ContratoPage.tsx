import { useCallback, useEffect, useState } from 'react';
import styles from './ContratoPage.module.css';
import { listarLancamentos } from '../../api/lancamentos';
import { ConfirmacaoEstorno } from '../../components/ConfirmacaoEstorno/ConfirmacaoEstorno';
import { FormLancamento } from '../../components/FormLancamento/FormLancamento';
import { GraficoEvolucao } from '../../components/GraficoEvolucao/GraficoEvolucao';
import { TabelaLancamentos } from '../../components/TabelaLancamentos/TabelaLancamentos';
import type { Lancamento } from '../../types';

interface ContratoPageProps {
  contratoId: string;
  nome: string;
  onVoltar: () => void;
}

export function ContratoPage({ contratoId, nome, onVoltar }: ContratoPageProps) {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [emEdicao, setEmEdicao] = useState<Lancamento | null>(null);
  const [paraEstornar, setParaEstornar] = useState<Lancamento | null>(null);

  const carregarLancamentos = useCallback(() => {
    setCarregando(true);
    listarLancamentos(contratoId)
      .then((dados) => {
        setLancamentos(dados);
        setErro(null);
      })
      .catch((e: Error) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [contratoId]);

  useEffect(() => {
    carregarLancamentos();
  }, [carregarLancamentos]);

  function aoSalvar() {
    setEmEdicao(null);
    carregarLancamentos();
  }

  function aoEstornar() {
    setParaEstornar(null);
    carregarLancamentos();
  }

  return (
    <main className="container">
      <button type="button" onClick={onVoltar} className={styles.voltar}>
        ← Voltar ao painel
      </button>

      <h1 className={styles.titulo}>{nome}</h1>

      <FormLancamento
        contratoId={contratoId}
        lancamentoEmEdicao={emEdicao}
        onSalvo={aoSalvar}
        onCancelarEdicao={() => setEmEdicao(null)}
      />

      <h2 className={styles.secao}>Histórico</h2>

      {erro && <p className={styles.erro}>{erro}</p>}
      {carregando ? (
        <p className={styles.carregando}>Carregando lançamentos...</p>
      ) : (
        <TabelaLancamentos
          lancamentos={lancamentos}
          onEditar={setEmEdicao}
          onEstornar={setParaEstornar}
        />
      )}

      <h2 className={styles.secao}>Evolução mensal</h2>
      <div className={styles.grafico}>
        <GraficoEvolucao lancamentos={lancamentos} />
      </div>

      {paraEstornar && (
        <ConfirmacaoEstorno
          lancamento={paraEstornar}
          onConfirmado={aoEstornar}
          onCancelar={() => setParaEstornar(null)}
        />
      )}
    </main>
  );
}