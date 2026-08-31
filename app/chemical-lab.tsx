"use client";

import {
  AlertTriangle,
  Atom,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Microscope,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  approximateMolarMass,
  atomColors,
  builderElements,
  elements,
  molecularFormula,
  moleculeExamples,
  type MoleculeAtom,
  type MoleculeBond,
  valenceReport,
} from "@/lib/chemistry";
import {
  diagnosisQuestions,
  modules,
  officialSources,
  stages,
  type LearningModule,
  type StageId,
} from "@/lib/curriculum";

const LAB_NAMES = {
  safety: "Bancada segura",
  matter: "Estados da matéria",
  atom: "Construtor de átomo",
  reaction: "Balanceador",
  ph: "Escala de pH",
  molecule: "Bancada molecular",
} as const;

const LAB_ORDER = ["safety", "matter", "atom", "reaction", "ph", "molecule"] as const;
type LabId = (typeof LAB_ORDER)[number];

function readStoredProgress() {
  if (typeof window === "undefined") return [] as string[];
  try {
    const parsed = JSON.parse(window.localStorage.getItem("chemical-progress-v2") || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function ModuleDialog({
  module,
  open,
  completed,
  onOpenChange,
  onComplete,
  onOpenLab,
}: {
  module: LearningModule | null;
  open: boolean;
  completed: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (id: string) => void;
  onOpenLab: (lab: LabId) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  if (!module) return null;
  const isCorrect = checked && selected === module.check.correct;
  const lesson = module;

  function listen() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = [
      lesson.title,
      lesson.question,
      ...lesson.steps.flatMap((step) => [step.title, step.text]),
      "Evidência de aprendizagem.",
      lesson.evidence,
    ].join(". ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="module-dialog max-h-[92vh] overflow-y-auto sm:max-w-4xl">
        <DialogClose className="dialog-close" aria-label="Fechar aula">
          <X aria-hidden="true" />
        </DialogClose>
        <DialogHeader className="pr-10">
          <div className="dialog-kicker">
            <Badge variant="outline">{module.duration}</Badge>
            {module.bncc.map((code) => (
              <Badge variant="secondary" key={code}>{code}</Badge>
            ))}
          </div>
          <DialogTitle className="font-display text-3xl leading-tight sm:text-5xl">
            {module.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-7">
            {module.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="lesson-question">
          <span>Pergunta de partida</span>
          <p>{module.question}</p>
        </div>

        <div className="dialog-toolbar">
          <Button type="button" variant="outline" onClick={listen}>
            <Volume2 /> Ouvir esta aula
          </Button>
          {module.lab && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                onOpenLab(module.lab as LabId);
              }}
            >
              <FlaskConical /> Abrir {LAB_NAMES[module.lab]}
            </Button>
          )}
        </div>

        <div className="lesson-grid">
          <section className="lesson-goals" aria-labelledby="goals-title">
            <h3 id="goals-title">Ao final, você será capaz de</h3>
            <ul>
              {module.goals.map((goal) => (
                <li key={goal}><Check aria-hidden="true" />{goal}</li>
              ))}
            </ul>
          </section>
          <section className="lesson-sequence" aria-labelledby="sequence-title">
            <h3 id="sequence-title">Percurso guiado</h3>
            <ol>
              {module.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h4>{step.title}</h4><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <Alert className="evidence-alert">
          <Sparkles />
          <AlertTitle>Evidência de aprendizagem</AlertTitle>
          <AlertDescription>{module.evidence}</AlertDescription>
        </Alert>

        <section className="checkpoint" aria-labelledby="checkpoint-title">
          <p className="eyebrow">CHECAGEM DE COMPREENSÃO</p>
          <h3 id="checkpoint-title">{module.check.prompt}</h3>
          <div className="answer-grid">
            {module.check.options.map((option, index) => (
              <button
                type="button"
                key={option}
                className={selected === index ? "answer selected" : "answer"}
                aria-pressed={selected === index}
                onClick={() => {
                  setSelected(index);
                  setChecked(false);
                }}
              >
                <span>{String.fromCharCode(65 + index)}</span>{option}
              </button>
            ))}
          </div>
          <Button
            type="button"
            onClick={() => setChecked(true)}
            disabled={selected === null}
          >
            Verificar resposta
          </Button>
          {checked && (
            <div className={isCorrect ? "feedback success" : "feedback error"} role="status">
              {isCorrect ? <CheckCircle2 /> : <AlertTriangle />}
              <p><strong>{isCorrect ? "Raciocínio correto." : "Revise sua escolha."}</strong> {module.check.explanation}</p>
            </div>
          )}
        </section>

        <DialogFooter className="dialog-finish">
          <p>{completed ? "Módulo já concluído neste navegador." : "A conclusão é liberada após a checagem correta."}</p>
          <Button
            type="button"
            disabled={!isCorrect && !completed}
            onClick={() => {
              onComplete(module.id);
              onOpenChange(false);
            }}
          >
            {completed ? "Concluído" : "Concluir módulo"} <ChevronRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DiagnosticDialog({
  open,
  onOpenChange,
  onRecommendation,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecommendation: (stage: StageId) => void;
}) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const finished = index >= diagnosisQuestions.length;
  const recommendation: StageId =
    score <= 1 ? "explorador" : score === 2 ? "investigador" : score === 3 ? "quimico" : "pesquisador";
  const stage = stages.find((item) => item.id === recommendation)!;

  function reset() {
    setIndex(0);
    setScore(0);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent showCloseButton={false} className="diagnostic-dialog sm:max-w-2xl">
        <DialogClose className="dialog-close" aria-label="Fechar diagnóstico">
          <X aria-hidden="true" />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">Descubra seu ponto de partida</DialogTitle>
          <DialogDescription>
            Quatro perguntas rápidas. A recomendação organiza o estudo, mas não bloqueia nenhuma etapa.
          </DialogDescription>
        </DialogHeader>
        {!finished ? (
          <>
            <div className="diagnostic-progress">
              <span>Pergunta {index + 1} de {diagnosisQuestions.length}</span>
              <Progress value={((index + 1) / diagnosisQuestions.length) * 100} />
            </div>
            <h3 className="diagnostic-question">{diagnosisQuestions[index].prompt}</h3>
            <div className="diagnostic-options">
              {diagnosisQuestions[index].options.map((option, optionIndex) => (
                <Button
                  type="button"
                  variant="outline"
                  key={option}
                  onClick={() => {
                    if (optionIndex === diagnosisQuestions[index].correct) {
                      setScore((current) => current + 1);
                    }
                    setIndex((current) => current + 1);
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="diagnostic-result">
            <span className="stage-number">{stage.number}</span>
            <p className="eyebrow">PONTO DE PARTIDA SUGERIDO</p>
            <h3>{stage.title}</h3>
            <p>{stage.promise}</p>
            <Alert>
              <CircleDashed />
              <AlertTitle>Isto não é uma nota.</AlertTitle>
              <AlertDescription>
                Você acertou {score} de {diagnosisQuestions.length}. Comece pela sugestão ou visite qualquer módulo para revisar conceitos anteriores.
              </AlertDescription>
            </Alert>
            <Button
              type="button"
              onClick={() => {
                onRecommendation(recommendation);
                onOpenChange(false);
              }}
            >
              Abrir trilha {stage.title} <ChevronRight />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SafetyLab() {
  const practices = [
    { id: "label", label: "Ler rótulo e FDS antes da atividade", safe: true },
    { id: "goggles", label: "Usar proteção indicada no roteiro", safe: true },
    { id: "supervision", label: "Trabalhar com supervisão responsável", safe: true },
    { id: "food", label: "Levar alimento e bebida para a bancada", safe: false },
    { id: "pipette", label: "Pipetar com a boca para ganhar tempo", safe: false },
    { id: "waste", label: "Separar resíduos conforme orientação institucional", safe: true },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const [evaluated, setEvaluated] = useState(false);
  const correct = practices.every((practice) => selected.includes(practice.id) === practice.safe);

  return (
    <div className="lab-workspace safety-workspace">
      <div className="lab-instrument">
        <p className="instrument-label">CHECKLIST DE ENTRADA</p>
        <div className="safety-symbol"><ShieldCheck /></div>
        <strong>{selected.length}/6</strong>
        <span>decisões marcadas</span>
      </div>
      <div className="lab-controls">
        <h3>Marque somente as práticas seguras</h3>
        <p>O simulador não substitui treinamento nem autorização institucional.</p>
        <div className="check-list">
          {practices.map((practice) => (
            <label key={practice.id}>
              <Checkbox
                checked={selected.includes(practice.id)}
                onCheckedChange={(value) => {
                  setEvaluated(false);
                  setSelected((current) =>
                    value
                      ? [...current, practice.id]
                      : current.filter((id) => id !== practice.id),
                  );
                }}
              />
              <span>{practice.label}</span>
            </label>
          ))}
        </div>
        <Button type="button" onClick={() => setEvaluated(true)}>Avaliar decisões</Button>
        {evaluated && (
          <div className={correct ? "feedback success" : "feedback error"} role="status">
            {correct ? <CheckCircle2 /> : <AlertTriangle />}
            <p>{correct
              ? "Entrada autorizada no laboratório virtual. Em um laboratório real, o responsável ainda deve aprovar o roteiro."
              : "Há uma prática insegura marcada ou uma prática essencial ausente. Revise rótulo/FDS, proteção, supervisão e resíduos."}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MatterLab() {
  const [temperature, setTemperature] = useState([25]);
  const value = temperature[0];
  const state = value <= 0 ? "sólido" : value >= 100 ? "gasoso" : "líquido";
  const stateCopy = {
    sólido: "Partículas próximas, organizadas e vibrando ao redor de posições médias.",
    líquido: "Partículas próximas, desordenadas e capazes de mudar de vizinhança.",
    gasoso: "Partículas muito afastadas, ocupando o volume disponível.",
  }[state];

  const particles = Array.from({ length: 36 }, (_, index) => {
    if (state === "sólido") {
      return { x: 15 + (index % 6) * 14, y: 38 + Math.floor(index / 6) * 9 };
    }
    if (state === "líquido") {
      return {
        x: 10 + ((index * 23) % 82),
        y: 48 + ((index * 17) % 40),
      };
    }
    return {
      x: 7 + ((index * 37) % 88),
      y: 8 + ((index * 53) % 82),
    };
  });

  return (
    <div className="lab-workspace">
      <div className="matter-chamber" aria-label={"Modelo particulado do estado " + state} role="img">
        <div className="chamber-scale"><span>130 °C</span><span>50 °C</span><span>−30 °C</span></div>
        {particles.map((particle, index) => (
          <i
            key={index}
            className={"particle " + state}
            style={{ left: particle.x + "%", top: particle.y + "%" }}
          />
        ))}
        <div className="state-readout">
          <span>Estado predominante</span>
          <strong>{state}</strong>
        </div>
      </div>
      <div className="lab-controls">
        <p className="instrument-label">TEMPERATURA APROXIMADA DA ÁGUA • 1 ATM</p>
        <div className="large-reading">{value} <span>°C</span></div>
        <Slider
          aria-label="Temperatura aproximada"
          min={-30}
          max={130}
          step={1}
          value={temperature}
          onValueChange={setTemperature}
        />
        <p className="lab-explanation">{stateCopy}</p>
        <p className="model-warning">
          Modelo qualitativo: distâncias, tamanhos, movimento e temperaturas de transição foram simplificados. A pressão altera as transições.
        </p>
      </div>
    </div>
  );
}

function AtomLab() {
  const [protons, setProtons] = useState([6]);
  const [neutrons, setNeutrons] = useState([6]);
  const [electrons, setElectrons] = useState([6]);
  const element = elements[protons[0] - 1];
  const charge = protons[0] - electrons[0];
  const shellCounts = [
    Math.min(electrons[0], 2),
    Math.min(Math.max(electrons[0] - 2, 0), 8),
    Math.min(Math.max(electrons[0] - 10, 0), 8),
  ];

  return (
    <div className="lab-workspace atom-workspace">
      <div className="atom-panel">
        <svg viewBox="0 0 400 400" role="img" aria-label={"Representação didática de " + element.name}>
          {shellCounts.map((count, shellIndex) => {
            if (!count) return null;
            const radius = 70 + shellIndex * 55;
            return (
              <g key={shellIndex}>
                <circle cx="200" cy="200" r={radius} className="orbit" />
                {Array.from({ length: count }, (_, electronIndex) => {
                  const angle = (electronIndex / count) * Math.PI * 2 - Math.PI / 2;
                  return (
                    <circle
                      key={electronIndex}
                      cx={200 + Math.cos(angle) * radius}
                      cy={200 + Math.sin(angle) * radius}
                      r="9"
                      className="electron-dot"
                    />
                  );
                })}
              </g>
            );
          })}
          <circle cx="200" cy="200" r="48" className="nucleus-circle" />
          <text x="200" y="194" textAnchor="middle" className="atom-symbol">{element.symbol}</text>
          <text x="200" y="218" textAnchor="middle" className="atom-z">Z = {protons[0]}</text>
        </svg>
      </div>
      <div className="lab-controls">
        <div className="atom-identity">
          <div><span>{element.atomicNumber}</span><strong>{element.symbol}</strong><small>{element.name}</small></div>
          <p>
            <Badge variant={charge === 0 ? "secondary" : "outline"}>
              {charge === 0 ? "átomo neutro" : charge > 0 ? "cátion +" + charge : "ânion " + charge}
            </Badge>
            <span>Número de massa A = {protons[0] + neutrons[0]}</span>
          </p>
        </div>
        <AtomSlider label="Prótons" value={protons} max={18} onChange={setProtons} />
        <AtomSlider label="Nêutrons" value={neutrons} max={22} onChange={setNeutrons} />
        <AtomSlider label="Elétrons" value={electrons} max={18} onChange={setElectrons} />
        <p className="model-warning">
          Camadas eletrônicas são uma aproximação introdutória. Orbitais quânticos não são trajetórias circulares.
        </p>
      </div>
    </div>
  );
}

function AtomSlider({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number[];
  max: number;
  onChange: (value: number[]) => void;
}) {
  return (
    <label className="instrument-slider">
      <span>{label}<strong>{value[0]}</strong></span>
      <Slider min={label === "Prótons" ? 1 : 0} max={max} step={1} value={value} onValueChange={onChange} />
    </label>
  );
}

function ReactionLab() {
  const [values, setValues] = useState([1, 1, 1]);
  const [evaluated, setEvaluated] = useState(false);
  const balanced = values[0] === values[2] && values[1] * 2 === values[2];
  const minimal = values[0] === 2 && values[1] === 1 && values[2] === 2;
  const leftH = values[0] * 2;
  const leftO = values[1] * 2;
  const rightH = values[2] * 2;
  const rightO = values[2];

  function update(index: number, value: number) {
    setEvaluated(false);
    setValues((current) => current.map((item, itemIndex) => itemIndex === index ? Math.max(1, Math.min(9, value || 1)) : item));
  }

  return (
    <div className="lab-workspace reaction-workspace">
      <div className="reaction-board">
        <p className="instrument-label">SÍNTESE DA ÁGUA • MODELO ESTEQUIOMÉTRICO</p>
        <div className="equation">
          <Coefficient value={values[0]} label="Coeficiente de H₂" onChange={(value) => update(0, value)} />
          <span>H<sub>2</sub></span><b>+</b>
          <Coefficient value={values[1]} label="Coeficiente de O₂" onChange={(value) => update(1, value)} />
          <span>O<sub>2</sub></span><b>→</b>
          <Coefficient value={values[2]} label="Coeficiente de H₂O" onChange={(value) => update(2, value)} />
          <span>H<sub>2</sub>O</span>
        </div>
        <div className="atom-ledger">
          <div><span>H à esquerda</span><strong>{leftH}</strong></div>
          <div><span>H à direita</span><strong>{rightH}</strong></div>
          <div><span>O à esquerda</span><strong>{leftO}</strong></div>
          <div><span>O à direita</span><strong>{rightO}</strong></div>
        </div>
      </div>
      <div className="lab-controls">
        <h3>Conserve cada elemento</h3>
        <p>Altere apenas os coeficientes. Os índices pertencem às fórmulas das substâncias.</p>
        <Button type="button" onClick={() => setEvaluated(true)}>Verificar conservação</Button>
        <Button type="button" variant="outline" onClick={() => { setValues([1, 1, 1]); setEvaluated(false); }}>
          <RotateCcw /> Reiniciar
        </Button>
        {evaluated && (
          <div className={balanced ? "feedback success" : "feedback error"} role="status">
            {balanced ? <CheckCircle2 /> : <AlertTriangle />}
            <p>{balanced
              ? minimal
                ? "Balanceada na menor proporção inteira: 2 : 1 : 2."
                : "Os átomos estão conservados, mas os coeficientes podem ser simplificados para 2 : 1 : 2."
              : "Ainda não: compare separadamente H e O nos dois lados."}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Coefficient({ value, label, onChange }: { value: number; label: string; onChange: (value: number) => void }) {
  return (
    <input
      aria-label={label}
      type="number"
      min={1}
      max={9}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}

function PhLab() {
  const [ph, setPh] = useState([7]);
  const value = ph[0];
  const character = value < 7 ? "ácida" : value > 7 ? "básica" : "neutra no modelo";
  const ratio = Math.pow(10, Math.abs(7 - value));
  const color = "hsl(" + (value / 14) * 250 + " 72% 54%)";

  return (
    <div className="lab-workspace ph-workspace">
      <div className="ph-meter" style={{ "--ph-color": color } as CSSProperties}>
        <p className="instrument-label">MEDIDOR VIRTUAL</p>
        <div className="ph-reading"><span>pH</span><strong>{value.toFixed(1)}</strong></div>
        <div className="ph-probe"><i /></div>
        <p>{character}</p>
      </div>
      <div className="lab-controls">
        <h3>Explore a escala logarítmica</h3>
        <Slider
          aria-label="Valor de pH"
          min={0}
          max={14}
          step={0.5}
          value={ph}
          onValueChange={setPh}
        />
        <div className="ph-scale" aria-hidden="true">
          <span>0 ácido</span><span>7</span><span>14 básico</span>
        </div>
        <p className="lab-explanation">
          Em relação a pH 7 e sob as simplificações do modelo, a atividade de H⁺ difere por um fator aproximado de <strong>{ratio.toLocaleString("pt-BR")}</strong>.
        </p>
        <p className="model-warning">
          pH depende de atividade, temperatura e matriz. Este controle não recomenda misturas nem substitui medição calibrada.
        </p>
      </div>
    </div>
  );
}

function bondLines(
  bond: MoleculeBond,
  positions: Record<number, { x: number; y: number }>,
) {
  const start = positions[bond.a];
  const end = positions[bond.b];
  if (!start || !end) return null;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = (-dy / length) * 1.3;
  const ny = (dx / length) * 1.3;
  const offsets = bond.order === 1 ? [0] : bond.order === 2 ? [-1, 1] : [-1.5, 0, 1.5];
  return offsets.map((offset, index) => (
    <line
      key={index}
      x1={start.x + nx * offset}
      y1={start.y + ny * offset}
      x2={end.x + nx * offset}
      y2={end.y + ny * offset}
    />
  ));
}

function MoleculeLab() {
  const initial = moleculeExamples[0];
  const [atoms, setAtoms] = useState<MoleculeAtom[]>(initial.atoms);
  const [bonds, setBonds] = useState<MoleculeBond[]>(initial.bonds);
  const [selected, setSelected] = useState<number[]>([]);
  const [elementToAdd, setElementToAdd] = useState("C");
  const [bondOrder, setBondOrder] = useState<1 | 2 | 3>(1);
  const report = valenceReport(atoms, bonds);
  const formula = molecularFormula(atoms) || "—";
  const mass = approximateMolarMass(atoms);
  const positions = useMemo(() => {
    const result: Record<number, { x: number; y: number }> = {};
    const total = Math.max(atoms.length, 1);
    atoms.forEach((atom, index) => {
      if (total === 1) {
        result[atom.id] = { x: 50, y: 50 };
      } else {
        const radius = Math.min(38, 20 + total * 1.6);
        const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
        result[atom.id] = {
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius,
        };
      }
    });
    return result;
  }, [atoms]);

  function loadExample(index: number) {
    const example = moleculeExamples[index];
    setAtoms(example.atoms.map((atom) => ({ ...atom })));
    setBonds(example.bonds.map((bond) => ({ ...bond })));
    setSelected([]);
  }

  function addAtom() {
    const nextId = atoms.reduce((max, atom) => Math.max(max, atom.id), 0) + 1;
    setAtoms((current) => [...current, { id: nextId, symbol: elementToAdd }]);
  }

  function addBond() {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    setBonds((current) => {
      const existing = current.find((bond) =>
        (bond.a === a && bond.b === b) || (bond.a === b && bond.b === a),
      );
      if (existing) {
        return current.map((bond) => bond === existing ? { ...bond, order: bondOrder } : bond);
      }
      return [...current, { a, b, order: bondOrder }];
    });
    setSelected([]);
  }

  function removeSelected() {
    if (!selected.length) return;
    setAtoms((current) => current.filter((atom) => !selected.includes(atom.id)));
    setBonds((current) => current.filter((bond) => !selected.includes(bond.a) && !selected.includes(bond.b)));
    setSelected([]);
  }

  const hasExceeded = report.some((item) => item.state === "exceeded");
  const hasOpen = report.some((item) => item.state === "open");

  return (
    <div className="molecule-workspace">
      <div className="molecule-canvas">
        <div className="molecule-readout">
          <div><span>Fórmula</span><strong>{formula}</strong></div>
          <div><span>Massa molar aproximada</span><strong>{mass ? mass.toFixed(3) : "—"} <small>g·mol⁻¹</small></strong></div>
        </div>
        <div className="structure-field" role="group" aria-label="Editor de conectividade molecular">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            {bonds.flatMap((bond) => bondLines(bond, positions) || [])}
          </svg>
          {atoms.map((atom) => {
            const position = positions[atom.id];
            const item = report.find((entry) => entry.id === atom.id);
            return (
              <button
                type="button"
                key={atom.id}
                className={"molecule-atom " + (selected.includes(atom.id) ? "selected " : "") + (item?.state || "")}
                style={{
                  left: position.x + "%",
                  top: position.y + "%",
                  background: atomColors[atom.symbol] || "#ffffff",
                  color: atom.symbol === "C" ? "#ffffff" : "#0b2022",
                }}
                aria-pressed={selected.includes(atom.id)}
                aria-label={atom.symbol + ", átomo " + atom.id + ", ligações somam " + item?.bondOrder}
                onClick={() => {
                  setSelected((current) =>
                    current.includes(atom.id)
                      ? current.filter((id) => id !== atom.id)
                      : current.length < 2
                        ? [...current, atom.id]
                        : [current[1], atom.id],
                  );
                }}
              >
                {atom.symbol}<small>{atom.id}</small>
              </button>
            );
          })}
          {!atoms.length && <p className="empty-structure">Adicione um átomo para começar.</p>}
        </div>
        <div className={"valence-banner " + (hasExceeded ? "danger" : hasOpen ? "warning" : "ok")}>
          {hasExceeded
            ? "Uma ou mais valências usuais foram excedidas."
            : hasOpen
              ? "Estrutura incompleta segundo as valências usuais do modelo."
              : "Contagem inicial compatível com valências usuais."}
        </div>
      </div>

      <div className="molecule-controls">
        <div>
          <p className="instrument-label">1 • CARREGAR REFERÊNCIA</p>
          <div className="example-buttons">
            {moleculeExamples.map((example, index) => (
              <Button type="button" variant="outline" size="sm" key={example.name} onClick={() => loadExample(index)}>
                {example.name}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <p className="instrument-label">2 • ADICIONAR ÁTOMO</p>
          <div className="control-row">
            <NativeSelect
              aria-label="Elemento a adicionar"
              value={elementToAdd}
              onChange={(event) => setElementToAdd(event.target.value)}
            >
              {builderElements.map((element) => (
                <NativeSelectOption key={element.symbol} value={element.symbol}>
                  {element.symbol} — {element.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <Button type="button" onClick={addAtom}><Plus /> Adicionar</Button>
          </div>
        </div>
        <div>
          <p className="instrument-label">3 • LIGAR DOIS ÁTOMOS SELECIONADOS</p>
          <div className="control-row">
            <NativeSelect
              aria-label="Ordem de ligação"
              value={String(bondOrder)}
              onChange={(event) => setBondOrder(Number(event.target.value) as 1 | 2 | 3)}
            >
              <NativeSelectOption value="1">Simples</NativeSelectOption>
              <NativeSelectOption value="2">Dupla</NativeSelectOption>
              <NativeSelectOption value="3">Tripla</NativeSelectOption>
            </NativeSelect>
            <Button type="button" onClick={addBond} disabled={selected.length !== 2}>
              Criar ligação
            </Button>
          </div>
        </div>
        <div className="control-row">
          <Button type="button" variant="outline" onClick={removeSelected} disabled={!selected.length}>
            <Trash2 /> Remover seleção
          </Button>
          <Button type="button" variant="ghost" onClick={() => { setAtoms([]); setBonds([]); setSelected([]); }}>
            <X /> Limpar
          </Button>
        </div>
        <Alert className="research-alert">
          <Microscope />
          <AlertTitle>Hipótese, não descoberta</AlertTitle>
          <AlertDescription>
            A checagem de valência é introdutória. Carga, estereoquímica, aromaticidade e estado eletrônico não estão representados. Não use este desenho como instrução de síntese.
          </AlertDescription>
        </Alert>
        <div className="database-links">
          <a href="https://pubchem.ncbi.nlm.nih.gov/docs/structure-search" target="_blank" rel="noreferrer">
            Pesquisar estrutura no PubChem <ExternalLink />
          </a>
          <a href="https://webbook.nist.gov/chemistry/form-ser/" target="_blank" rel="noreferrer">
            Consultar fórmula no NIST <ExternalLink />
          </a>
        </div>
      </div>
    </div>
  );
}

function LabSection({ activeLab, onLabChange }: { activeLab: LabId; onLabChange: (lab: LabId) => void }) {
  return (
    <section id="laboratorio" className="section-shell lab-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">LABORATÓRIO DIGITAL</p>
          <h2>Experimente modelos.<br />Proteja pessoas.</h2>
        </div>
        <p>
          Seis bancadas conectam conceitos às decisões. Nenhuma atividade recomenda misturas domésticas ou substitui laboratório supervisionado.
        </p>
      </div>
      <Tabs value={activeLab} onValueChange={(value) => onLabChange(value as LabId)}>
        <TabsList className="lab-tabs" variant="line" aria-label="Bancadas virtuais">
          {LAB_ORDER.map((id) => (
            <TabsTrigger key={id} value={id}>{LAB_NAMES[id]}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="safety"><SafetyLab /></TabsContent>
        <TabsContent value="matter"><MatterLab /></TabsContent>
        <TabsContent value="atom"><AtomLab /></TabsContent>
        <TabsContent value="reaction"><ReactionLab /></TabsContent>
        <TabsContent value="ph"><PhLab /></TabsContent>
        <TabsContent value="molecule"><MoleculeLab /></TabsContent>
      </Tabs>
    </section>
  );
}

export default function ChemicalLab() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState<StageId>("explorador");
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [moduleOpen, setModuleOpen] = useState(false);
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [activeLab, setActiveLab] = useState<LabId>("safety");
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCompleted(readStoredProgress());
      setLargeText(window.localStorage.getItem("chemical-large-text") === "true");
      setHighContrast(window.localStorage.getItem("chemical-high-contrast") === "true");
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const progress = Math.round((completed.length / modules.length) * 100);
  const nextModule = modules.find((module) => !completed.includes(module.id)) || modules[modules.length - 1];

  function completeModule(id: string) {
    setCompleted((current) => {
      const next = current.includes(id) ? current : [...current, id];
      window.localStorage.setItem("chemical-progress-v2", JSON.stringify(next));
      return next;
    });
  }

  function selectStage(next: StageId) {
    setStage(next);
    window.setTimeout(() => document.getElementById("trilha")?.scrollIntoView({ behavior: "smooth" }), 20);
  }

  function openLab(lab: LabId) {
    setActiveLab(lab);
    window.setTimeout(() => document.getElementById("laboratorio")?.scrollIntoView({ behavior: "smooth" }), 20);
  }

  return (
    <div className={"chemical-app " + (largeText ? "large-text " : "") + (highContrast ? "high-contrast" : "")}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Chemical, início">
          <span className="brand-symbol">C<small>6</small></span>
          <span><strong>Chemical</strong><small>laboratório de aprendizagem</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#trilha">Trilha</a>
          <a href="#laboratorio">Laboratório</a>
          <a href="#metodo">Método</a>
          <a href="#fontes">Fontes</a>
        </nav>
        <div className="access-controls" aria-label="Preferências de leitura">
          <label title="Aumentar texto">
            <Checkbox
              checked={largeText}
              onCheckedChange={(value) => {
                const next = Boolean(value);
                setLargeText(next);
                window.localStorage.setItem("chemical-large-text", String(next));
              }}
            />
            A+
          </label>
          <label title="Aumentar contraste">
            <Checkbox
              checked={highContrast}
              onCheckedChange={(value) => {
                const next = Boolean(value);
                setHighContrast(next);
                window.localStorage.setItem("chemical-high-contrast", String(next));
              }}
            />
            Contraste
          </label>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className="dashboard">
          <aside className="dashboard-intro">
            <p className="eyebrow">CIÊNCIA ABERTA • PERCURSO COMPLETO</p>
            <h1>Entre curioso.<br /><em>Saia pesquisador.</em></h1>
            <p>
              Uma aprendizagem de Química guiada do primeiro olhar sobre os materiais à formulação responsável de uma hipótese molecular.
            </p>
            <div className="intro-actions">
              <Button type="button" size="lg" onClick={() => setDiagnosticOpen(true)}>
                <GraduationCap /> Fazer diagnóstico
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={() => openLab("safety")}>
                <ShieldCheck /> Entrar com segurança
              </Button>
            </div>
          </aside>

          <div className="dashboard-console">
            <div className="console-top">
              <span>PAINEL DO APRENDIZ</span>
              <span className="status-live"><i /> progresso local</span>
            </div>
            <div className="progress-display">
              <div className="progress-number">
                <strong>{hydrated ? progress : 0}</strong><span>%</span>
              </div>
              <div>
                <p>{completed.length} de {modules.length} módulos concluídos</p>
                <Progress value={hydrated ? progress : 0} />
                <small>Salvo somente neste navegador. Nenhum cadastro necessário.</small>
              </div>
            </div>
            <article className="next-mission">
              <div>
                <span>PRÓXIMA MISSÃO • {stages.find((item) => item.id === nextModule.stage)?.title}</span>
                <h2>{nextModule.title}</h2>
                <p>{nextModule.question}</p>
              </div>
              <Button
                type="button"
                onClick={() => {
                  setActiveModule(nextModule);
                  setModuleOpen(true);
                }}
              >
                Continuar <ChevronRight />
              </Button>
            </article>
            <div className="console-stats">
              <div><BookOpen /><span><strong>16</strong> módulos guiados</span></div>
              <div><FlaskConical /><span><strong>6</strong> bancadas virtuais</span></div>
              <div><Atom /><span><strong>4</strong> patamares</span></div>
            </div>
          </div>
        </section>

        <section id="trilha" className="section-shell curriculum-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MAPA DE APRENDIZAGEM</p>
              <h2>Um percurso.<br />Muitas entradas.</h2>
            </div>
            <p>
              A idade não bloqueia o conhecimento. Escolha um patamar, faça o diagnóstico ou revise desde o início. Cada módulo explicita objetivo, sequência, evidência e vínculo curricular.
            </p>
          </div>

          <Tabs value={stage} onValueChange={(value) => setStage(value as StageId)}>
            <TabsList className="stage-tabs" aria-label="Patamares de aprendizagem">
              {stages.map((item) => (
                <TabsTrigger key={item.id} value={item.id}>
                  <span>{item.number}</span>{item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {stages.map((item) => {
              const stageModules = modules.filter((module) => module.stage === item.id);
              const completedInStage = stageModules.filter((module) => completed.includes(module.id)).length;
              return (
                <TabsContent key={item.id} value={item.id}>
                  <div className="stage-header" style={{ "--stage-accent": item.accent } as CSSProperties}>
                    <div>
                      <span>{item.audience}</span>
                      <h3>{item.title}</h3>
                      <p>{item.promise}</p>
                    </div>
                    <div className="stage-meter">
                      <strong>{completedInStage}/{stageModules.length}</strong>
                      <span>concluídos</span>
                    </div>
                  </div>
                  <div className="module-grid">
                    {stageModules.map((module) => {
                      const done = completed.includes(module.id);
                      return (
                        <article className={done ? "module-card done" : "module-card"} key={module.id}>
                          <div className="module-card-top">
                            <span>{String(module.order).padStart(2, "0")}</span>
                            {done ? <CheckCircle2 aria-label="Concluído" /> : <CircleDashed aria-label="Disponível" />}
                          </div>
                          <div className="module-tags">
                            {module.bncc.slice(0, 2).map((code) => <Badge variant="outline" key={code}>{code}</Badge>)}
                            <Badge variant="secondary">{module.duration}</Badge>
                          </div>
                          <h4>{module.title}</h4>
                          <p>{module.subtitle}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModule(module);
                              setModuleOpen(true);
                            }}
                          >
                            {done ? "Revisar módulo" : "Iniciar módulo"} <ChevronRight />
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        <LabSection activeLab={activeLab} onLabChange={setActiveLab} />

        <section id="metodo" className="section-shell method-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMO O CHEMICAL ENSINA</p>
              <h2>Fenômeno.<br />Modelo. Evidência.</h2>
            </div>
            <p>
              O percurso evita a memorização isolada. Toda etapa começa com uma pergunta, conecta representações e termina com uma produção observável.
            </p>
          </div>
          <div className="method-flow">
            {[
              ["01", "Observe", "Descreva o fenômeno e diferencie observação de interpretação."],
              ["02", "Pergunte", "Transforme curiosidade em questão delimitada e investigável."],
              ["03", "Modele", "Use partículas, símbolos, relações matemáticas e declare limites."],
              ["04", "Teste", "Compare previsões com dados, controles e incertezas."],
              ["05", "Argumente", "Conclua na medida da evidência e comunique fontes e limites."],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
          <div className="alignment-panel">
            <div>
              <ShieldCheck />
              <h3>Segurança incorporada</h3>
              <p>Rótulo, FDS, GHS, supervisão e resíduos aparecem antes de qualquer bancada.</p>
            </div>
            <div>
              <GraduationCap />
              <h3>Currículo rastreável</h3>
              <p>Códigos da BNCC aparecem nos módulos; DCNEM e currículo catarinense orientam integração e progressão.</p>
            </div>
            <div>
              <Microscope />
              <h3>Ciência sem atalhos</h3>
              <p>Modelos digitais produzem hipóteses. Descobertas exigem pesquisa, caracterização, reprodutibilidade e ética.</p>
            </div>
          </div>
        </section>

        <section id="fontes" className="section-shell sources-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">BASE DOCUMENTAL</p>
              <h2>Fontes oficiais.<br />Limites visíveis.</h2>
            </div>
            <p>
              A seleção prioriza órgãos normativos, universidades públicas e instituições científicas responsáveis por terminologia e dados avaliados.
            </p>
          </div>
          <Accordion type="multiple" className="sources-accordion">
            {officialSources.map((source, index) => (
              <AccordionItem value={source.id} key={source.id}>
                <AccordionTrigger>
                  <span className="source-index">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{source.title}</strong><small>{source.institution}</small></span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{source.note}</p>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    Abrir documento oficial <ExternalLink />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Alert className="curriculum-note">
            <BookOpen />
            <AlertTitle>Alinhamento não é homologação.</AlertTitle>
            <AlertDescription>
              O Chemical é um recurso educacional independente. Ele apoia o ensino, mas não substitui currículo da rede, projeto político-pedagógico, professor, laboratório institucional ou formação profissional.
            </AlertDescription>
          </Alert>
        </section>

        <section className="credit-section">
          <div className="credit-mark"><span>Sr</span><small>projeto 16</small></div>
          <div>
            <p className="eyebrow">AUTORIA E GRATIDÃO</p>
            <h2>Idealizado por Sidiney Rodrigues.</h2>
            <p>
              Com gratidão a quem transforma curiosidade em pergunta, aula em investigação e conhecimento em bem comum. Desenvolvimento técnico assistido por OpenAI Codex, sob direção humana.
            </p>
          </div>
          <a href="https://github.com/sidineyr/Chemical" target="_blank" rel="noreferrer">
            Código aberto <ExternalLink />
          </a>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand">
          <span className="brand-symbol">C<small>6</small></span>
          <span><strong>Chemical</strong><small>aprender é investigar</small></span>
        </div>
        <p>Recurso educacional aberto • Progresso salvo localmente • Sem instruções de síntese</p>
        <a href="#inicio">Voltar ao início</a>
      </footer>

      <ModuleDialog
        key={`${activeModule?.id ?? "none"}-${moduleOpen ? "open" : "closed"}`}
        module={activeModule}
        open={moduleOpen}
        completed={activeModule ? completed.includes(activeModule.id) : false}
        onOpenChange={setModuleOpen}
        onComplete={completeModule}
        onOpenLab={openLab}
      />
      <DiagnosticDialog
        open={diagnosticOpen}
        onOpenChange={setDiagnosticOpen}
        onRecommendation={selectStage}
      />
    </div>
  );
}
