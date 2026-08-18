const uniqueId = Date.now();

const organizationData = {
  buildOrganizationPage: {
    expectedUrl: 'https://app.optiomax.com/build_organization',
    expectedHeading: 'Build Organization',
  },

  addOrganization: {
    name: `Automation Organization ${uniqueId}`,
    description:
      'This organization entity is created for Playwright automation testing.',
  },

  contactInformation: {
    telephone: '771234567',
    address: '123 Main Street, Colombo',
    email: 'automation@test.com',
    website: 'https://automation-test.com',
  },
};

export default organizationData;

  