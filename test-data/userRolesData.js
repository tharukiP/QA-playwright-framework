const uniqueNumber = Date.now();

export const userRolesData = {
  // =====================================
  // Add User Role test data
  // =====================================

  validRole: {
    name: `QA Engineer ${uniqueNumber}`,
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

  // =====================================
  // Edit User Role test data
  // =====================================

  editRole: {
    existingRoleName: 'QA Automation Role 1785126478933',

    updatedRoleName: `QA Automation Role 1785126478933 ${uniqueNumber}`,

    updatedDescription:
      'This user role was created by test automation',
  },

  deleteRole: {
    name: `Purchasing Officer ${uniqueNumber}`,

    description:
      'This role was created for the delete user role automation test.',
  },
};




