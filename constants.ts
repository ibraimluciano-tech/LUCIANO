import { ChecklistItem, QuizQuestion, TrueFalseQuestion, CaseStudy, AssociationPair, StudentResult } from './types';

export const CHECKLIST_DATA: ChecklistItem[] = [
  { id: 'C01', aula: 15, topic: 'Entender o Capítulo V da CLT.' },
  { id: 'C02', aula: 15, topic: 'Diferenciar Acidente, Doença e Incidente.' },
  { id: 'C03', aula: 15, topic: 'Compreender a função das NRs (Normas Regulamentadoras).' },
  { id: 'C04', aula: 16, topic: 'Identificar Riscos Ergonômicos no armazém.' },
  { id: 'C05', aula: 16, topic: 'Protocolos de Segurança para Empilhadeiras.' },
  { id: 'C06', aula: 16, topic: 'Uso correto de EPIs (Equipamentos de Proteção Individual).' },
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'M01',
    aula: 15,
    question: 'De acordo com a NR-6, a responsabilidade de fornecer o EPI é:',
    options: {
      A: 'Do próprio funcionário.',
      B: 'Da CIPA.',
      C: 'Do empregador.',
      D: 'Do sindicato.',
    },
    correctAnswer: 'C',
  },
  {
    id: 'M02',
    aula: 15,
    question: 'Um almoxarife que desenvolve um problema de coluna crônico devido ao peso excessivo sofre de:',
    options: {
      A: 'Incidente.',
      B: 'Doença Ocupacional.',
      C: 'Acidente de Trabalho Típico.',
      D: 'Ato Inseguro.',
    },
    correctAnswer: 'B',
  },
  {
    id: 'M03',
    aula: 16,
    question: 'Qual a cor utilizada para sinalizar "Atenção" no Mapa de Riscos?',
    options: {
      A: 'Vermelho',
      B: 'Verde',
      C: 'Amarelo',
      D: 'Azul',
    },
    correctAnswer: 'C',
  }
];

export const TRUE_FALSE_DATA: TrueFalseQuestion[] = [
  {
    id: 'V01',
    aula: 15,
    statement: 'Um "incidente" é um evento que causa um acidente grave com afastamento.',
    isTrue: false,
    justification: 'Um incidente é um "quase acidente", um evento que tinha o potencial de causar um dano, mas não causou.',
  },
  {
    id: 'V02',
    aula: 16,
    statement: 'O risco de inalar poeira de caixas de papelão armazenadas há muito tempo pode ser considerado um risco biológico/químico.',
    isTrue: true,
    justification: '',
  },
  {
    id: 'V03',
    aula: 15,
    statement: 'A CIPA é formada apenas por representantes indicados pelo empregador.',
    isTrue: false,
    justification: 'A CIPA é composta por representantes do empregador e dos empregados.',
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'E01',
    aula: 15,
    scenario: 'Você vê um colega utilizando uma empilhadeira para dar "carona" a outro funcionário que precisa alcançar uma prateleira alta.',
    idealAnswer: 'A atitude correta é intervir imediatamente, de forma respeitosa mas firme, alertando que empilhadeiras não são elevadores de pessoas. Relate o risco ao supervisor se a prática persistir, pois há risco de queda fatal.',
  },
  {
    id: 'E02',
    aula: 16,
    scenario: 'Ao organizar o estoque, você percebe que as caixas de um produto químico novo possuem um pictograma de caveira (tóxico). Seus colegas estão armazenando essas caixas junto com outros materiais comuns, como embalagens e produtos de limpeza. Qual é a atitude correta a ser tomada?',
    idealAnswer: 'Você deve parar o armazenamento imediatamente. Informe aos colegas que o símbolo indica um Risco Químico grave (toxicidade) e que esses materiais não podem ser armazenados com itens comuns. A atitude correta é consultar a Ficha de Informação de Segurança do Produto Químico (FISPQ) para entender as regras de armazenagem, que provavelmente exigirão um local separado, ventilado e sinalizado, e comunicar a liderança para garantir o procedimento correto.',
  },
  {
    id: 'E03',
    aula: 16,
    scenario: 'A equipe está com pressa para finalizar a expedição e começa a empilhar caixas em um corredor principal, bloqueando a passagem e o acesso a um extintor de incêndio, com a justificativa de que "será por pouco tempo". Qual é a atitude correta a ser tomada?',
    idealAnswer: 'A atitude correta é alertar a equipe sobre os dois riscos graves que estão sendo criados: o Risco de Acidentes (bloqueio de rota de fuga e circulação) e o impedimento de acesso a um equipamento de emergência. Você deve insistir que, mesmo que seja por pouco tempo, as regras de segurança não podem ser quebradas. A equipe deve mover os materiais para uma área de "stage" ou expedição designada que não obstrua passagens nem equipamentos de segurança.',
  }
];

export const ASSOCIATION_DATA: AssociationPair[] = [
  { id: 'P01', term: 'NR-6', definition: 'Norma que estabelece as regras para o uso de Equipamentos de Proteção Individual.' },
  { id: 'P02', term: 'Incidente', definition: 'Evento inesperado que não resulta em lesão, mas serve como um alerta.' },
  { id: 'P03', term: 'Risco Ergonômico', definition: 'Risco relacionado ao levantamento de peso e postura inadequada.' },
  { id: 'P04', term: 'CIPA', definition: 'Comissão formada por empregados e empregador para atuar na prevenção de acidentes.' },
  { id: 'P05', term: 'Mapa de Riscos', definition: 'Ferramenta visual que indica os tipos e a gravidade dos riscos em um setor.' },
];

export const MOCK_STUDENT_RESULTS: StudentResult[] = [
  { name: 'Ana Silva', score: 450, time: '12:30', completedTasks: 15, date: '2023-10-25' },
  { name: 'João Souza', score: 320, time: '18:45', completedTasks: 10, date: '2023-10-25' },
  { name: 'Carlos Lima', score: 510, time: '10:15', completedTasks: 18, date: '2023-10-26' },
  { name: 'Beatriz Costa', score: 280, time: '22:00', completedTasks: 8, date: '2023-10-26' },
  { name: 'Marcos Paulo', score: 390, time: '15:20', completedTasks: 12, date: '2023-10-27' },
  { name: 'Fernanda Oliveira', score: 480, time: '11:10', completedTasks: 17, date: '2023-10-27' },
  { name: 'Ricardo Santos', score: 150, time: '08:00', completedTasks: 5, date: '2023-10-27' },
];