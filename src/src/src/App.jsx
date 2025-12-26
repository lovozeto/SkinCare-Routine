import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  CheckCircle2, 
  Circle, 
  Info, 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  Pill,
  AlertCircle
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('morning');
  const [completedSteps, setCompletedSteps] = useState(() => {
    // Persistencia básica: guardar checkboxes si recarga la página
    const saved = localStorage.getItem('rutina_steps');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // Guardar progreso en localStorage
  useEffect(() => {
    localStorage.setItem('rutina_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  // Resetear checkboxes automáticamente a las 4 AM del día siguiente
  useEffect(() => {
    const lastReset = localStorage.getItem('last_reset_date');
    const today = new Date().toLocaleDateString();
    
    if (lastReset !== today) {
       // Si es un nuevo día, limpiar
       setCompletedSteps({});
       localStorage.setItem('last_reset_date', today);
    }

    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) {
      setActiveTab('night');
    }
  }, []);

  const getNightTreatment = (dayIndex) => {
    if (dayIndex === 0) return {
      name: "Descanso Total",
      quantity: "Cero ácidos hoy",
      desc: "Solo limpieza e hidratación.",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <Sparkles className="w-5 h-5" />
    };
    
    if ([1, 3, 5].includes(dayIndex)) return {
      name: "Soolantra (Tubo Blanco)",
      quantity: "Tamaño de un guisante",
      desc: "Aplica una capa fina solo en zonas rojas/granitos.",
      color: "bg-rose-50 border-rose-200 text-rose-800",
      icon: <Pill className="w-5 h-5" />
    };
    
    return {
      name: "Rozelaic (Tubo Blanco/Azul)",
      quantity: "Tamaño de un guisante grande",
      desc: "Capa muy fina en todo el rostro.",
      color: "bg-indigo-50 border-indigo-200 text-indigo-800",
      icon: <Pill className="w-5 h-5" />
    };
  };

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const steps = {
    morning: [
      {
        id: 'm1',
        title: 'Limpieza Suave',
        quantity: 'Tamaño de una moneda',
        desc: 'Espuma con agua tibia.',
        icon: <Droplets className="w-5 h-5 text-blue-500" />
      },
      {
        id: 'm2',
        title: 'Uriage DÉPIDERM',
        quantity: '2 a 3 gotas',
        desc: 'Deja absorber 1 minuto.',
        icon: <Sparkles className="w-5 h-5 text-yellow-500" />
      },
      {
        id: 'm3',
        title: 'TOCOBO Bifida Biome (Azul)',
        quantity: '3 a 4 gotas',
        desc: 'Calentar en palmas y presionar.',
        icon: <ShieldCheck className="w-5 h-5 text-blue-600" />
      },
      {
        id: 'm4',
        title: 'Bioderma Sensibio AR+',
        quantity: 'Tamaño de una avellana',
        desc: 'Cubrir todo el rostro.',
        icon: <Droplets className="w-5 h-5 text-pink-500" />
      },
      {
        id: 'm5',
        title: 'TOCOBO Sun Serum (Verde)',
        quantity: 'Dos dedos de largo',
        desc: 'Fundamental para que funcione.',
        icon: <Sun className="w-5 h-5 text-green-500" />
      },
      {
        id: 'm6',
        title: 'Probioessens',
        quantity: '1 Sobre completo',
        desc: 'Disuelto en medio vaso de agua.',
        icon: <Pill className="w-5 h-5 text-purple-500" />
      }
    ],
    night: [
      {
        id: 'n1',
        title: 'Limpieza Profunda',
        quantity: 'Tamaño de una moneda',
        desc: 'Retira bien el protector solar.',
        icon: <Droplets className="w-5 h-5 text-blue-500" />
      },
      {
        id: 'n2',
        title: 'TOCOBO Cica Calming (Verde)',
        quantity: '3 a 4 gotas',
        desc: 'El colchón para proteger la piel.',
        icon: <Sparkles className="w-5 h-5 text-green-600" />
      },
      {
        id: 'n3',
        isTreatment: true, 
      },
      {
        id: 'n4',
        title: 'Si sientes resequedad',
        quantity: 'Poca cantidad (opcional)',
        desc: 'Pon Sensibio AR+ 20 min después del medicamento.',
        icon: <Info className="w-5 h-5 text-gray-400" />
      }
    ]
  };

  const treatment = getNightTreatment(currentDay);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <div className="min-h-screen bg-white font-sans pb-[env(safe-area-inset-bottom)] selection:bg-teal-100">
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100 pt-[env(safe-area-inset-top)]">
        <div className="max-w-3xl mx-auto px-5 py-4 flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Rutina de Mamá</h1>
            <p className="text-sm text-gray-500 capitalize font-medium">
              {days[currentDay]}
            </p>
          </div>
          <button 
            onClick={() => setShowInstallGuide(!showInstallGuide)}
            className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
            aria-label="Instrucciones de instalación"
          >
            <Info size={22} />
          </button>
        </div>
        
        <div className="flex max-w-3xl mx-auto w-full">
          <button
            onClick={() => setActiveTab('morning')}
            className={`flex-1 py-3 text-center text-sm font-semibold flex justify-center items-center gap-2 transition-all border-b-2
              ${activeTab === 'morning' ? 'text-amber-600 border-amber-500 bg-amber-50/50' : 'text-gray-400 border-transparent'}`}
          >
            <Sun size={18} /> Mañana
          </button>
          <button
            onClick={() => setActiveTab('night')}
            className={`flex-1 py-3 text-center text-sm font-semibold flex justify-center items-center gap-2 transition-all border-b-2
              ${activeTab === 'night' ? 'text-indigo-600 border-indigo-500 bg-indigo-50/50' : 'text-gray-400 border-transparent'}`}
          >
            <Moon size={18} /> Noche
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4 w-full">
        
        {activeTab === 'night' && (
          <div className={`p-5 rounded-2xl border ${treatment.color} mb-6 shadow-sm`}>
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-white/60 rounded-xl shadow-sm">
                {treatment.icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Hoy Toca:</p>
                <h3 className="font-bold text-xl mb-1 text-gray-900">{treatment.name}</h3>
                <div className="flex items-center gap-1.5 mt-2 font-medium text-sm bg-white/50 px-2 py-1 rounded-md inline-flex">
                  <Droplets size={14} />
                  {treatment.quantity}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {steps[activeTab].map((step) => {
            if (step.isTreatment) {
               const stepId = `n_treat_${currentDay}`;
               const isCompleted = completedSteps[stepId];
               return (
                <div 
                  key={stepId}
                  onClick={() => toggleStep(stepId)}
                  className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer shadow-sm flex items-start gap-4 select-none
                    ${isCompleted ? 'border-green-200 bg-green-50/60' : 'border-indigo-100 hover:border-indigo-300 ring-1 ring-indigo-50'}
                  `}
                >
                  <div className={`mt-1 flex-shrink-0 transition-colors ${isCompleted ? 'text-green-500' : 'text-gray-300'}`}>
                    {isCompleted ? <CheckCircle2 size={26} /> : <Circle size={26} />}
                  </div>
                  <div>
                    <h3 className={`font-bold text-gray-800 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                      {treatment.name}
                    </h3>
                    <p className={`text-sm font-medium mt-1 text-indigo-600 ${isCompleted ? 'text-gray-400' : ''}`}>
                       Cantidad: {treatment.quantity}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{treatment.desc}</p>
                  </div>
                </div>
               );
            }

            const isCompleted = completedSteps[step.id];
            
            return (
              <div 
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer shadow-sm flex items-start gap-4 group select-none
                  ${isCompleted ? 'border-green-100 bg-green-50/40' : 'border-gray-100 hover:border-gray-300'}
                `}
              >
                <div className={`mt-1 flex-shrink-0 transition-colors ${isCompleted ? 'text-green-500' : 'text-gray-300 group-hover:text-teal-400'}`}>
                  {isCompleted ? <CheckCircle2 size={26} /> : <Circle size={26} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {step.icon && <span className="opacity-70 scale-75 origin-left">{step.icon}</span>}
                    <h3 className={`font-bold text-gray-800 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className={`text-sm font-semibold mb-0.5 ${isCompleted ? 'text-gray-400' : 'text-teal-700'}`}>
                    {step.quantity}
                  </p>
                  <p className={`text-xs ${isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl text-gray-600 text-xs flex gap-3 items-start border border-gray-100">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
          <p>
            Si la piel pica mucho, suspende los medicamentos de noche y usa solo hidratante hasta que calme.
          </p>
        </div>

      </div>

      {showInstallGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowInstallGuide(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4 text-center">Instalar App</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <p>Toca el botón <span className="font-bold">Compartir</span> abajo (cuadrado con flecha).</p>
              </div>
              <div className="w-px h-4 bg-gray-200 mx-auto"></div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <p>Selecciona <span className="font-bold">"Agregar al inicio"</span>.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowInstallGuide(false)}
              className="mt-6 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;