import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, CheckCircle2, Circle, Info, Droplets, 
  Sparkles, ShieldCheck, Pill, AlertCircle, Share, PlusSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer } from 'vaul';
import { Toaster, toast } from 'sonner';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const App = () => {
  const [activeTab, setActiveTab] = useState('morning');
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('rutina_steps');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  useEffect(() => {
    const root = window.document.documentElement;
    if (activeTab === 'night') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('rutina_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    const lastReset = localStorage.getItem('last_reset_date');
    const today = new Date().toLocaleDateString();
    
    if (lastReset !== today) {
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
      color: "bg-blue-50/90 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-100",
      icon: <Sparkles className="w-5 h-5" />
    };
    if ([1, 3, 5].includes(dayIndex)) return {
      name: "Soolantra (Tubo Blanco)",
      quantity: "Tamaño guisante",
      desc: "Capa fina solo en zonas rojas.",
      color: "bg-rose-50/90 border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-100",
      icon: <Pill className="w-5 h-5" />
    };
    return {
      name: "Rozelaic (Tubo Azul)",
      quantity: "Tamaño guisante grande",
      desc: "Capa muy fina en todo el rostro.",
      color: "bg-indigo-50/90 border-indigo-200 text-indigo-800 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-100",
      icon: <Pill className="w-5 h-5" />
    };
  };

  const toggleStep = (stepId, title) => {
    const isNowCompleted = !completedSteps[stepId];
    setCompletedSteps(prev => ({ ...prev, [stepId]: isNowCompleted }));
    if (navigator.vibrate) navigator.vibrate(10);
    if (isNowCompleted) {
      toast.success(title, { description: '¡Listo!', duration: 1500 });
    }
  };

  const steps = {
    morning: [
      { id: 'm1', title: 'Limpieza Suave', quantity: 'Tamaño moneda', desc: 'Espuma con agua tibia.', icon: <Droplets className="w-5 h-5 text-blue-500" /> },
      { id: 'm2', title: 'Uriage DÉPIDERM', quantity: '2-3 gotas', desc: 'Deja absorber 1 min.', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
      { id: 'm3', title: 'TOCOBO Bifida', quantity: '3-4 gotas', desc: 'Calentar en palmas.', icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
      { id: 'm4', title: 'Sensibio AR+', quantity: 'Tamaño avellana', desc: 'Todo el rostro.', icon: <Droplets className="w-5 h-5 text-pink-500" /> },
      { id: 'm5', title: 'TOCOBO Sun', quantity: '2 dedos (Generoso)', desc: 'No olvidar cuello.', icon: <Sun className="w-5 h-5 text-green-500" /> },
      { id: 'm6', title: 'Probioessens', quantity: '1 Sobre', desc: 'En medio vaso de agua.', icon: <Pill className="w-5 h-5 text-purple-500" /> }
    ],
    night: [
      { id: 'n1', title: 'Limpieza Profunda', quantity: 'Tamaño moneda', desc: 'Retira bien el bloqueador.', icon: <Droplets className="w-5 h-5 text-blue-500" /> },
      { id: 'n2', title: 'TOCOBO Cica', quantity: '3-4 gotas', desc: 'Calma la piel.', icon: <Sparkles className="w-5 h-5 text-green-600" /> },
      { id: 'n3', isTreatment: true },
      { id: 'n4', title: 'Si hay resequedad', quantity: 'Opcional', desc: 'Sensibio AR+ 20min después.', icon: <Info className="w-5 h-5 text-gray-400" /> }
    ]
  };

  const treatment = getNightTreatment(currentDay);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-700 font-sans pb-safe-offset-4 selection:bg-blue-500/30">
      <Toaster position="top-center" richColors theme={activeTab === 'night' ? 'dark' : 'light'} />
      
      {/* --- FONDO DEGRADADO --- */}
      <div className={cn(
        "fixed top-0 left-0 right-0 h-[600px] pointer-events-none transition-opacity duration-1000 z-0",
        activeTab === 'morning' ? "opacity-100" : "opacity-0"
      )}>
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 via-orange-50/50 to-gray-50/0" />
      </div>

      <div className={cn(
        "fixed top-0 left-0 right-0 h-[700px] pointer-events-none transition-opacity duration-1000 z-0",
        activeTab === 'night' ? "opacity-100" : "opacity-0"
      )}>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-black/0" />
      </div>


      {/* --- HEADER --- */}
      <div className="relative z-10 pt-safe-top">
        <div className="px-6 pt-6 pb-4">
          
          <div className="flex justify-between items-start mb-6">
            <motion.p 
              key={currentDay}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-indigo-200/60 mt-2"
            >
              {days[currentDay]}
            </motion.p>

            {/* BOTÓN INFO CON SOMBRA FUERTE */}
            <Drawer.Root shouldScaleBackground>
              <Drawer.Trigger asChild>
                <button className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/60 hover:scale-105 transition-all text-gray-600 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                  <Info size={22} />
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
                <Drawer.Content className="bg-white dark:bg-gray-900 flex flex-col rounded-t-[32px] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none max-w-md mx-auto">
                  <div className="p-6">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-700 mb-8" />
                    <h3 className="text-xl font-bold mb-6 text-center dark:text-white">Instalar App</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                        <Share className="text-blue-500" />
                        <p className="text-sm dark:text-gray-300">1. Toca <span className="font-bold">Compartir</span> en Safari.</p>
                      </div>
                      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                        <PlusSquare className="text-blue-500" />
                        <p className="text-sm dark:text-gray-300">2. Selecciona <span className="font-bold">Agregar al inicio</span>.</p>
                      </div>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>

          <div className="mb-8">
            <motion.h1 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
            >
              {activeTab === 'morning' ? (
                <>Buenos días,<br/><span className="text-amber-600 dark:text-amber-400 drop-shadow-sm">Mamá</span> ☀️</>
              ) : (
                <>Buenas noches,<br/><span className="text-indigo-400 drop-shadow-sm">Mamá</span> 🌙</>
              )}
            </motion.h1>
          </div>

          {/* TABS CON SOMBRA Y ELEVACIÓN */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-1.5 rounded-2xl flex relative shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-white/50 dark:border-white/10">
            <motion.div 
              layoutId="activeTabBg"
              className={cn(
                "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-gray-700 rounded-xl shadow-md z-0 ring-1 ring-black/5 dark:ring-white/10",
                activeTab === 'night' ? 'left-[50%]' : 'left-1.5'
              )}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            <button
              onClick={() => setActiveTab('morning')}
              className={cn(
                "flex-1 py-3 text-sm font-bold relative z-10 flex justify-center items-center gap-2 transition-colors duration-300 rounded-xl",
                activeTab === 'morning' ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              )}
            >
              Mañana
            </button>
            <button
              onClick={() => setActiveTab('night')}
              className={cn(
                "flex-1 py-3 text-sm font-bold relative z-10 flex justify-center items-center gap-2 transition-colors duration-300 rounded-xl",
                activeTab === 'night' ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              )}
            >
              Noche
            </button>
          </div>
        </div>
      </div>

      {/* --- LISTA --- */}
      <div className="max-w-md mx-auto px-5 pb-10 space-y-5 relative z-10">
        
        <AnimatePresence mode='wait'>
          {activeTab === 'night' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={cn("p-5 rounded-3xl border shadow-lg relative overflow-hidden backdrop-blur-md", treatment.color)}
            >
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-white shadow-sm rounded-2xl dark:bg-gray-900/50 dark:shadow-none">
                  {treatment.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Tratamiento Hoy</p>
                  <h3 className="font-bold text-lg leading-tight">{treatment.name}</h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-white/60 dark:bg-black/20 px-2.5 py-1 rounded-lg border border-black/5">
                    {treatment.quantity}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {steps[activeTab].map((step) => {
              const isTreatmentStep = step.isTreatment;
              const stepId = isTreatmentStep ? `n_treat_${currentDay}` : step.id;
              const displayTitle = isTreatmentStep ? treatment.name : step.title;
              const displayQty = isTreatmentStep ? treatment.quantity : step.quantity;
              const displayDesc = isTreatmentStep ? treatment.desc : step.desc;
              const isCompleted = completedSteps[stepId];

              return (
                <motion.div
                  key={stepId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleStep(stepId, displayTitle)}
                  className={cn(
                    "relative overflow-hidden p-4 rounded-[24px] border transition-all duration-300 cursor-pointer flex items-center gap-4 group",
                    // SOMBRAS Y BORDES REFORZADOS EN LAS TARJETAS
                    isCompleted 
                      ? "bg-green-50/90 border-green-200 dark:bg-green-900/20 dark:border-green-900/30 shadow-none" 
                      : "bg-white dark:bg-gray-900 border-white/50 dark:border-gray-800 shadow-md shadow-gray-200/40 dark:shadow-black/40 hover:shadow-lg hover:border-blue-200 dark:hover:border-gray-700"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 transition-colors duration-300",
                    isCompleted ? "text-green-500" : "text-gray-300 dark:text-gray-600"
                  )}>
                    {isCompleted ? <CheckCircle2 size={28} className="fill-current" /> : <Circle size={28} />}
                  </div>

                  <div className="flex-1 min-w-0 py-1">
                    <h3 className={cn(
                      "font-bold text-[17px] leading-tight transition-colors mb-1",
                      isCompleted ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-800 dark:text-gray-100"
                    )}>
                      {displayTitle}
                    </h3>
                    
                    {!isCompleted && (
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[13px] font-bold text-blue-600 dark:text-blue-400">
                          {displayQty}
                        </p>
                        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-snug">
                          {displayDesc}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-8 p-4 bg-white/60 dark:bg-gray-900/60 rounded-2xl text-gray-500 dark:text-gray-400 text-xs flex gap-3 items-center border border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0 opacity-70" />
          <p>Si la piel pica mucho, suspende los medicamentos.</p>
        </div>
        
        <div className="h-10" />
      </div>
    </div>
  );
};

export default App;