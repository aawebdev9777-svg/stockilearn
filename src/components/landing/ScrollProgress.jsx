import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60]"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #58CC02, #4A90D9, #FFD700)",
      }}
    />
  );
}