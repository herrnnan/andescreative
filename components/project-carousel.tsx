import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCarouselProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export const ProjectCarousel = ({
  images,
  isOpen,
  onClose,
  projectTitle,
}: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Lightbox (modal secundario)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Manejo de teclas para cerrar o navegar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        setLightboxOpen(false);
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  // Reiniciar carga al cambiar imagen
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  // Animaciones de slides
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const handleImageClick = () => {
    setLightboxImage(images[currentIndex]);
    setLightboxOpen(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl h-[80vh] flex flex-col rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-medium text-white">{projectTitle}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Slides */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 flex items-center justify-center p-6"
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white/80 rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={images[currentIndex]}
                    alt={`Project image ${currentIndex + 1}`}
                    className={cn(
                      "max-h-full max-w-full object-contain transition-opacity duration-300 rounded-lg shadow-2xl cursor-pointer",
                      isLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={() => setIsLoading(false)}
                    onClick={handleImageClick}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Flechas de navegación */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all border border-white/10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all border border-white/10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center items-center p-4 gap-2 border-t border-white/10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-4 bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Lightbox con Zoom o sin Zoom */}
          <ImageLightbox
            isOpen={lightboxOpen}
            src={lightboxImage}
            onClose={() => setLightboxOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------------------------------------------------------------------------------
// LIGHTBOX (puede tener zoom o solo mostrarse grande, según prefieras).
// Aquí con un botón grande para cerrar incluso cuando está la imagen "zoomed".
// ---------------------------------------------------------------------------------

function ImageLightbox({
  isOpen,
  src,
  onClose,
}: {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Calcula el punto de zoom si deseas zoom interactivo
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isZoomed) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    setTransformOrigin(`${originX}% ${originY}%`);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar - con zIndex alto */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-4 bg-black/60 rounded-full text-white hover:bg-black/80 transition-all z-[9999]"
            >
              <X size={32} />
            </button>

            {/* Botón de Zoom (alternar) */}
            <button
              onClick={toggleZoom}
              className="absolute bottom-4 right-4 p-4 bg-black/60 rounded-full text-white hover:bg-black/80 transition-all z-[9999]"
            >
              {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
            </button>

            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="relative w-full h-full overflow-hidden cursor-pointer"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            >
              <motion.img
                src={src}
                alt="Lightbox image"
                className="rounded-lg shadow-2xl object-contain w-full h-full"
                style={{
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                  transformOrigin: transformOrigin,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
