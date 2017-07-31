import os from 'os'

export const numCpus = () => os.cpus().length;
export const loadAvgs = () => os.loadavg();
export const totalMem = () => os.totalmem();
