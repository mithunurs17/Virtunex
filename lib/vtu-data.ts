// lib/vtu-data.ts

export type VTUBranch = {
  code: string;
  name: string;
  board: string;
};

export const VTU_BRANCHES: VTUBranch[] = [
  // CSE Board
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    board: 'CSE',
  },
  {
    code: 'ISE',
    name: 'Information Science & Engineering',
    board: 'CSE',
  },

  // Electronics & Communication Board
  {
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    board: 'EC',
  },
  {
    code: 'TE',
    name: 'Telecommunication Engineering',
    board: 'EC',
  },

  // Civil Board
  {
    code: 'CIVIL',
    name: 'Civil Engineering',
    board: 'CIVIL',
  },
  {
    code: 'ENV',
    name: 'Environmental Engineering',
    board: 'CIVIL',
  },
  {
    code: 'CCT',
    name: 'Ceramics & Cement Technology',
    board: 'CIVIL',
  },

  // Industrial & Production Board
  {
    code: 'IP',
    name: 'Industrial & Production Engineering',
    board: 'IP',
  },
  {
    code: 'IEM',
    name: 'Industrial Engineering & Management',
    board: 'IP',
  },
  {
    code: 'MSE',
    name: 'Manufacturing Science & Engineering',
    board: 'IP',
  },

  // Mechanical Board
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    board: 'ME',
  },
  {
    code: 'AE',
    name: 'Aeronautical Engineering',
    board: 'ME',
  },
  {
    code: 'MINING',
    name: 'Mining Engineering',
    board: 'ME',
  },

  // Electrical & Electronics Board
  {
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    board: 'E&E',
  },

  // Information Technology Board
  {
    code: 'BME',
    name: 'Biomedical Engineering',
    board: 'IT',
  },
  {
    code: 'INST',
    name: 'Instrumentation Technology',
    board: 'IT',
  },
  {
    code: 'MED',
    name: 'Medical Electronics',
    board: 'IT',
  },

  // Automobile
  {
    code: 'AUTO',
    name: 'Automobile Engineering',
    board: 'AU',
  },

  // Biotechnology
  {
    code: 'BT',
    name: 'Biotechnology',
    board: 'BT',
  },

  // Chemical Board
  {
    code: 'CHE',
    name: 'Chemical Engineering',
    board: 'CHE',
  },
  {
    code: 'POLYMER',
    name: 'Polymer Science & Technology',
    board: 'CHE',
  },
  {
    code: 'SILK',
    name: 'Silk Technology',
    board: 'CHE',
  },
  {
    code: 'TEXTILE',
    name: 'Textile Technology',
    board: 'CHE',
  },
];