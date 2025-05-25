import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCertificates, formatYear } from "../../utils/api.js";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  
  useEffect(() => {
    const getCertificates = async () => {
      try {
        const data = await fetchCertificates();
        setCertificates(data);
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      }
    };

    getCertificates();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Certificates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border-l-4 border-purple-500 pl-4 py-3 hover:bg-white/5 rounded-r-lg transition-colors"
          >
            <h3 className="text-xl font-semibold text-white">
              {certificate.name}
            </h3>
            <p className="text-purple-400 mt-1">{formatYear(certificate.year)}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certificates;