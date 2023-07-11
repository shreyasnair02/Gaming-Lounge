import { motion } from "framer-motion";

export default function PageWrapper({ className, children, classes }) {
  return (
    <motion.section
      className={"p-2 lg:p-6 min-h-[90dvh] relative " + classes}
      
      initial={{ opacity: 0, y: "30px" }}
      animate={{ opacity: 1, y: "0px" }}
      exit={{ opacity: 0, y: "-30px" }}
    >
      {children}
    </motion.section>
  );
}
