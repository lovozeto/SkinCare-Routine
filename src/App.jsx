import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, CheckCircle2, Circle, Info, Droplets, 
  Sparkles, ShieldCheck, Pill, AlertCircle, Share, PlusSquare, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer } from 'vaul';
import { Toaster, toast } from 'sonner';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utilidad para clases limpias
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

  // Sincronizar Tema con la Pestaña (Noche = Dark Mode)
  useEffect(() => {
    const root = window.document.documentElement;
    if (activeTab === 'night') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [activeTab]);

  // Persistencia y Reset diario
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
      color: "bg-blue-50/50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
      icon: <Sparkles className="w-5 h-5" />
    };
    
    if ([1, 3, 5].includes(dayIndex)) return {
      name: "Soolantra (Tubo Blanco)",
      quantity: "Tamaño de un guisante",
      desc: "Aplica una capa fina solo en zonas rojas.",
      color: "bg-rose-50/50 border-rose-200 text-rose-800 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-100",
      icon: <Pill className="w-5 h-5" />
    };
    
    return {
      name: "Rozelaic (Tubo Azul)",
      quantity: "Tamaño de un guisante grande",
      desc: "Capa muy fina en todo el rostro.",
      color: "bg-indigo-50/50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-100",
      icon: <Pill className="w-5 h-5" />
    };
  };

  const toggleStep = (stepId, title) => {
    const isNowCompleted = !completedSteps[stepId];
    
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: isNowCompleted
    }));

    // Feedback háptico (vibración suave en móviles)
    if (navigator.vibrate) navigator.vibrate(10);

    // Notificación Sonner estilo iOS
    if (isNowCompleted) {
      toast.success(title, {
        description: '¡Paso completado!',
        duration: 2000,
      });
    }
  };

  const steps = {
    morning: [
      { id: 'm1', title: 'Limpieza Suave', quantity: 'Tamaño moneda', desc: 'Espuma con agua tibia.', icon: <Droplets className="w-5 h-5 text-blue-500" /> },
      { id: 'm2', title: 'Uriage DÉPIDERM', quantity: '2-3 gotas', desc: 'Deja absorber 1 min.', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
      { id: 'm3', title: 'TOCOBO Bifida (Azul)', quantity: '3-4 gotas', desc: 'Calentar en palmas.', icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
      { id: 'm4', title: 'Sensibio AR+', quantity: 'Tamaño avellana', desc: 'Todo el rostro.', icon: <Droplets className="w-5 h-5 text-pink-500" /> },
      { id: 'm5', title: 'TOCOBO Sun (Verde)', quantity: '2 dedos (Generoso)', desc: 'No olvidar cuello.', icon: <Sun className="w-5 h-5 text-green-500" /> },
      { id: 'm6', title: 'Probioessens', quantity: '1 Sobre', desc: 'En medio vaso de agua.', icon: <Pill className="w-5 h-5 text-purple-500" /> }
    ],
    night: [
      { id: 'n1', title: 'Limpieza Profunda', quantity: 'Tamaño moneda', desc: 'Retira bien el bloqueador.', icon: <Droplets className="w-5 h-5 text-blue-500" /> },
      { id: 'n2', title: 'TOCOBO Cica (Verde)', quantity: '3-4 gotas', desc: 'Calma la piel.', icon: <Sparkles className="w-5 h-5 text-green-600" /> },
      { id: 'n3', isTreatment: true },
      { id: 'n4', title: 'Si hay resequedad', quantity: 'Opcional', desc: 'Sensibio AR+ 20min después.', icon: <Info className="w-5 h-5 text-gray-400" /> }
    ]
  };

  const treatment = getNightTreatment(currentDay);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <div className="min-h-screen bg-ios-bg-light dark:bg-black transition-colors duration-500 font-sans pb-safe-offset-4 selection:bg-blue-500/30">
      <Toaster position="top-center" richColors theme={activeTab === 'night' ? 'dark' : 'light'} />
      
      {/* Header Estilo iOS Large Title */}
      <div className="sticky top-0 z-20 bg-ios-bg-light/80 dark:bg-black/80 backdrop-blur-xl border-b border-ios-separator-light/50 dark:border-ios-separator-dark/50 pt-safe-top">
        <div className="max-w-md mx-auto px-5 py-3 flex justify-between items-center">
          <div>
            <motion.p 
              key={currentDay}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold uppercase tracking-wider text-ios-gray dark:text-gray-400"
            >
              {days[currentDay]}
            </motion.p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Rutina
            </h1>
          </div>

          {/* Botón de Ayuda / Instalación (Drawer Trigger) */}
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <button className="p-2.5 bg-white dark:bg-ios-card-dark rounded-full shadow-sm border border-ios-separator-light/50 dark:border-ios-separator-dark active:scale-90 transition-transform">
                <Info size={20} className="text-ios-blue" />
              </button>
            </Drawer.Trigger>
            
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
              <Drawer.Content className="bg-white dark:bg-ios-card-dark flex flex-col rounded-t-[32px] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none max-w-md mx-auto">
                <div className="p-4 bg-white dark:bg-ios-card-dark rounded-t-[32px] flex-1">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-600 mb-8" />
                  <div className="max-w-md mx-auto px-4 pb-8">
                    <Drawer.Title className="font-bold text-2xl mb-4 text-gray-900 dark:text-white text-center">
                      Instalar App
                    </Drawer.Title>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                        <div className="bg-white dark:bg-black p-3 rounded-xl shadow-sm text-ios-blue">
                          <Share size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          1. Toca el botón <span className="font-bold text-gray-900 dark:text-white">Compartir</span> en la barra inferior de Safari.
                        </p>
                      </div>
                      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                        <div className="bg-white dark:bg-black p-3 rounded-xl shadow-sm text-ios-blue">
                          <PlusSquare size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          2. Selecciona <span className="font-bold text-gray-900 dark:text-white">"Agregar al inicio"</span> en la lista.
                        </p>
                      </div>
                    </div>
                    <Drawer.Close asChild>
                      <button className="w-full mt-8 bg-ios-blue text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-transform">
                        Entendido
                      </button>
                    </Drawer.Close>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Segmented Control iOS Style */}
        <div className="px-5 pb-4 max-w-md mx-auto">
          <div className="bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-xl flex relative">
            {/* Fondo animado del tab activo */}
            <motion.div 
              layoutId="activeTabBg"
              className={cn(
                "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gray-600 rounded-lg shadow-sm z-0",
                activeTab === 'night' ? 'left-[50%]' : 'left-1'
              )}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            
            <button
              onClick={() => setActiveTab('morning')}
              className={cn(
                "flex-1 py-2 text-sm font-semibold relative z-10 flex justify-center items-center gap-2 transition-colors duration-300",
                activeTab === 'morning' ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              )}
            >
              <Sun size={16} /> Mañana
            </button>
            <button
              onClick={() => setActiveTab('night')}
              className={cn(
                "flex-1 py-2 text-sm font-semibold relative z-10 flex justify-center items-center gap-2 transition-colors duration-300",
                activeTab === 'night' ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              )}
            >
              <Moon size={16} /> Noche
            </button>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-md mx-auto px-5 py-6 space-y-5">
        
        {/* Banner Tratamiento (Solo Noche) */}
        <AnimatePresence mode='wait'>
          {activeTab === 'night' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className={cn("p-5 rounded-3xl border shadow-sm relative overflow-hidden", treatment.color)}
            >
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-white/90 dark:bg-white/10 rounded-2xl shadow-sm backdrop-blur-md">
                  {treatment.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Tratamiento de Hoy</p>
                  <h3 className="font-bold text-xl mb-1 leading-tight">{treatment.name}</h3>
                  <div className="inline-flex items-center gap-1.5 mt-2 font-medium text-xs bg-white/50 dark:bg-black/20 px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                    <Droplets size={12} />
                    {treatment.quantity}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista de Pasos */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {steps[activeTab].map((step) => {
              // ID y estado para Tratamiento Dinámico
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleStep(stepId, displayTitle)}
                  className={cn(
                    "relative overflow-hidden p-4 rounded-[20px] border transition-all duration-300 cursor-pointer flex items-start gap-4 group",
                    // Estilos condicionales Light/Dark/Completed
                    isCompleted 
                      ? "bg-green-50/50 border-green-200/50 dark:bg-green-900/10 dark:border-green-900/30" 
                      : "bg-white dark:bg-ios-card-dark border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none"
                  )}
                >
                  {/* Icono Check */}
                  <div className={cn(
                    "mt-1 flex-shrink-0 transition-colors duration-300",
                    isCompleted ? "text-green-500" : "text-gray-300 dark:text-gray-600 group-hover:text-ios-blue"
                  )}>
                    {isCompleted ? <CheckCircle2 size={24} className="fill-current" /> : <Circle size={24} />}
                  </div>

                  {/* Textos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!isTreatmentStep && step.icon && (
                        <span className="opacity-70 scale-75 origin-left text-gray-500 dark:text-gray-400">
                          {step.icon}
                        </span>
                      )}
                      <h3 className={cn(
                        "font-bold text-[17px] leading-snug transition-colors",
                        isCompleted ? "text-gray-400 dark:text-gray-500 line-through decoration-2" : "text-gray-900 dark:text-white"
                      )}>
                        {displayTitle}
                      </h3>
                    </div>
                    
                    <p className={cn(
                      "text-[15px] font-medium mb-0.5 transition-colors",
                      isCompleted ? "text-gray-400 dark:text-gray-600" : "text-ios-blue dark:text-blue-400"
                    )}>
                      {displayQty}
                    </p>
                    <p className={cn(
                      "text-[13px] leading-relaxed transition-colors",
                      isCompleted ? "text-gray-300 dark:text-gray-700" : "text-gray-500 dark:text-gray-400"
                    )}>
                      {displayDesc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Tip del día (Sticky Bottom safe area?) No, inline mejor */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-gray-600 dark:text-gray-400 text-xs flex gap-3 items-start border border-gray-100 dark:border-gray-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-70" />
          <p className="leading-relaxed">
            Si la piel pica mucho, suspende los medicamentos de noche y usa solo hidratante hasta que calme.
          </p>
        </div>
        
        {/* Espaciador para scroll final cómodo */}
        <div className="h-10" />

      </div>
    </div>
  );
};

export default App;