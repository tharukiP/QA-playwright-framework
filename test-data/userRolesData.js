const uniqueNumber = Date.now();

export const userRolesData = {
  validRole: {
    name: `QA Automation Role ${uniqueNumber}`,
    description:
      'This user role was created by Playwright automation.',
  },

  roleWithoutName: {
    description:
      'This description is entered without a role name.',
  },

  roleWithoutDescription: {
    name: `Description Required Role ${uniqueNumber}`,
  },

  duplicateRole: {
    // Use a role name that already exists on the page
    name: 'Asset Manager',
    description:
      'This record is used to verify duplicate user role validation.',
  },
};