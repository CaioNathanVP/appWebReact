export interface Tarefa {
  _id: string;
  titulo: string;
  descricao?: string;
  status: 'pendente' | 'finalizado';
  dataInicio?: string;
  dataPrevisao?: string;
  dataConclusao?: string;
}