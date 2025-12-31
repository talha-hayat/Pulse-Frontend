import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  Filter, 
  Thermometer, 
  Zap, 
  Shield, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Droplet,
  Layers
} from 'lucide-react';

const WaterFiltrationAnimation = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [waterLevel, setWaterLevel] = useState(0);
  const [showImpurities, setShowImpurities] = useState(true);
  const containerRef = useRef(null);

  const stages = [
    {
      id: 1,
      name: "Sediment Filter",
      description: "Removes large particles like sand, rust, and dirt",
      icon: <Filter className="w-6 h-6" />,
      color: "from-gray-400 to-gray-600",
      removes: ["Sand", "Rust", "Dust"],
      time: 2
    },
    {
      id: 2,
      name: "Second Sediment",
      description: "Filters fine particles and suspended solids",
      icon: <Layers className="w-6 h-6" />,
      color: "from-gray-300 to-gray-500",
      removes: ["Fine Sediment", "Silt"],
      time: 2
    },
    {
      id: 3,
      name: "Pre-Carbon Filter",
      description: "Removes chlorine, odor, and chemicals",
      icon: <Thermometer className="w-6 h-6" />,
      color: "from-yellow-700 to-yellow-900",
      removes: ["Chlorine", "Odors", "Chemicals"],
      time: 2
    },
    {
      id: 4,
      name: "Second Carbon",
      description: "Further removes organic impurities",
      icon: <Thermometer className="w-6 h-6" />,
      color: "from-yellow-600 to-yellow-800",
      removes: ["Organic Matter", "Taste"],
      time: 2
    },
    {
      id: 5,
      name: "RO Membrane",
      description: "Removes 99% dissolved solids, heavy metals, bacteria",
      icon: <Shield className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      removes: ["Dissolved Solids", "Heavy Metals", "Bacteria"],
      time: 3
    },
    {
      id: 6,
      name: "Post Carbon Filter",
      description: "Polishes taste and removes final odors",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "from-green-500 to-green-700",
      removes: ["Final Odors", "Aftertaste"],
      time: 2
    },
    {
      id: 7,
      name: "UV Sterilization",
      description: "Kills remaining viruses and bacteria",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-purple-700",
      removes: ["Viruses", "Bacteria", "Microbes"],
      time: 2
    },
    {
      id: 8,
      name: "TDS Controller",
      description: "Balances mineral content",
      icon: <Droplet className="w-6 h-6" />,
      color: "from-indigo-500 to-indigo-700",
      adds: ["Mineral Balance"],
      time: 2
    },
    {
      id: 9,
      name: "Alkaline Filter",
      description: "Increases pH level for alkaline water",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "from-teal-500 to-teal-700",
      adds: ["Alkaline pH", "Antioxidants"],
      time: 2
    },
    {
      id: 10,
      name: "Mineralizer",
      description: "Adds essential minerals for healthy water",
      icon: <Droplets className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-700",
      adds: ["Essential Minerals", "Electrolytes"],
      time: 2
    }
  ];

  // Auto play animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= stages.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000); // 2 seconds per stage

    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  // Water level animation
  useEffect(() => {
    const targetLevel = ((currentStage + 1) / stages.length) * 100;
    const interval = setInterval(() => {
      setWaterLevel(prev => {
        if (prev >= targetLevel) return prev;
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [currentStage, stages.length]);

  const handleReset = () => {
    setCurrentStage(0);
    setWaterLevel(0);
    setShowImpurities(true);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const currentStageData = stages[currentStage];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            10-Stage Water Purification Process
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Experience how our advanced filtration system transforms ordinary water into pure, 
            healthy, alkaline drinking water in just 10 steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Filtration Process Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Filtration Progress
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {Math.round(waterLevel)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${waterLevel}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Filtration Tube Animation */}
              <div className="relative h-96 mb-8" ref={containerRef}>
                {/* Water Tube */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-full 
                              border-2 border-gray-300 rounded-lg overflow-hidden bg-blue-50">
                  {/* Water Level */}
                  <motion.div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300"
                    initial={{ height: "0%" }}
                    animate={{ height: `${waterLevel}%` }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Impurities - Show in early stages */}
                  {showImpurities && currentStage < 5 && (
                    <div className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-gray-600 rounded-full"
                          initial={{
                            left: `${Math.random() * 90}%`,
                            top: `${Math.random() * 100}%`
                          }}
                          animate={{
                            y: [0, 20, 0],
                            opacity: currentStage > 2 ? [1, 0.5, 1] : 1
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Bubbles - Show in later stages */}
                  {currentStage >= 5 && (
                    <div className="absolute inset-0">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 bg-white/30 rounded-full"
                          initial={{
                            left: `${Math.random() * 90}%`,
                            bottom: "0%"
                          }}
                          animate={{
                            y: [-400, 0],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Stage Indicators along the tube */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full h-full">
                  {stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="absolute left-1/2 transform -translate-x-1/2"
                      style={{ top: `${(index + 0.5) * 9}%` }}
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center 
                                  shadow-lg border-4 ${
                                    index <= currentStage
                                      ? `bg-gradient-to-br ${stage.color} border-white`
                                      : 'bg-gray-300 border-gray-200'
                                  }`}
                        animate={{
                          scale: index === currentStage ? [1, 1.2, 1] : 1
                        }}
                        transition={{
                          duration: 2,
                          repeat: index === currentStage ? Infinity : 0
                        }}
                      >
                        <div className="text-white">
                          {index <= currentStage ? stage.icon : stage.id}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Labels */}
                <div className="absolute left-0 top-0 h-full w-32">
                  {stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="absolute text-right pr-4"
                      style={{ top: `${index * 10}%` }}
                    >
                      <span className={`text-sm font-medium ${
                        index <= currentStage ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        Stage {stage.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
                           transition-colors flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                           transition-colors"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentStage === 0}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStage === stages.length - 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stage Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Current Stage: {currentStage + 1}/10
                </h2>
                <div className="flex items-center space-x-2 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${currentStageData.color}`}>
                    <div className="text-white">
                      {currentStageData.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {currentStageData.name}
                    </h3>
                    <p className="text-gray-600">
                      Processing time: {currentStageData.time}s
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  {currentStageData.description}
                </p>

                {/* What's being removed/added */}
                <div className="space-y-4">
                  {currentStageData.removes && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                        Removes:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStageData.removes.map((item, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStageData.adds && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Adds:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStageData.adds.map((item, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stage List */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-700 mb-4">All Stages:</h4>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {stages.map((stage, index) => (
                    <motion.div
                      key={stage.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        index === currentStage
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                      whileHover={{ x: 5 }}
                      onClick={() => setCurrentStage(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index <= currentStage
                            ? `bg-gradient-to-br ${stage.color} text-white`
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {index <= currentStage ? <CheckCircle className="w-4 h-4" /> : stage.id}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            index === currentStage ? 'text-blue-600' : 'text-gray-700'
                          }`}>
                            {stage.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Stage {stage.id}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Result Display */}
        <AnimatePresence>
          {currentStage === stages.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">🎉 Purification Complete!</h3>
                  <p className="text-emerald-100">
                    Water is now 100% pure, alkaline, and enriched with essential minerals
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">99.9%</div>
                  <div className="text-emerald-200">Purity Level</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">pH 8.5+</div>
                  <div className="text-sm">Alkaline Level</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">0 TDS</div>
                  <div className="text-sm">Total Dissolved Solids</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm">Essential Minerals</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Germ Free</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WaterFiltrationAnimation;