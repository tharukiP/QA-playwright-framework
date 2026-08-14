const uniqueId = Date.now();

const designationData = {
  designationPage: {
    expectedUrl: 'https://app.optiomax.com/designation',
    expectedHeading: 'Designation',
  },

  addDesignation: {
    validName: `Automation Test Manager ${uniqueId}`,
    validDescription:
      'This designation is created for Playwright automation testing.',
  },

  editDesignation: {
    updatedName: `Automation Updated Manager ${uniqueId}`,
    updatedDescription:
      'Updated designation description for Playwright automation testing.',
  },

  duplicateDesignation: {
    existingName: 'Help Desk Technician',
    description: 'Duplicate designation validation test.',
  },

  deleteDesignation: {
    incorrectName: 'Incorrect Designation',
    partialName: 'Automation Updated',
  },
};

export default designationData;