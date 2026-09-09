import { test, expect } from '@playwright/test';

import OrganizationPage from '../../pages/OrganizationPage.js';

import organizationData from '../../test-data/organizationData.js';


// =====================================
// Organization Test Suite
// =====================================

test.describe('Build Organization - Create Organization', () => {

  let organizationPage;


  // =====================================
  // Before Each
  // =====================================

  test.beforeEach(async ({ page }) => {

    organizationPage =
      new OrganizationPage(page);
  
    await page.goto(
      'https://app.optiomax.com/dashboard',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      }
    );
  
    await expect(
      page
    ).toHaveURL(
      /\/dashboard/,
      {
        timeout: 30000,
      }
    );

  });


  // =====================================
  // TC-ORG-CRE-001
  // Verify Build Organization page
  // =====================================

  test(
    'TC-ORG-CRE-001 - Should display Build Organization page',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .verifyBuildOrganizationPage();

    }
  );


  // =====================================
  // TC-ORG-CRE-002
  // Verify Create Organization + button
  // =====================================

  test(
    'TC-ORG-CRE-002 - Should display Create Organization button',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .verifyAddOrganizationButton();

    }
  );


  // =====================================
  // TC-ORG-CRE-003
  // Open Add Organization Entity drawer
  // =====================================

  test(
    'TC-ORG-CRE-003 - Should open Add organization entity drawer',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

    }
  );


  // =====================================
  // TC-ORG-CRE-004
  // Verify Add Organization Entity drawer UI
  // =====================================

  test(
    'TC-ORG-CRE-004 - Should display Add organization entity drawer UI',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyAddOrganizationDrawer();

    }
  );


  // =====================================
  // TC-ORG-CRE-005
  // Verify Organization Name is required
  // =====================================

  test(
    'TC-ORG-CRE-005 - Should display Organization Name as required',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyOrganizationNameRequired();

    }
  );


  // =====================================
  // TC-ORG-CRE-006
  // Verify Description is required
  // =====================================

  test(
    'TC-ORG-CRE-006 - Should display Description as required',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyOrganizationDescriptionRequired();

    }
  );


  // =====================================
  // TC-ORG-CRE-007
  // Verify optional fields
  // =====================================

  test(
    'TC-ORG-CRE-007 - Should display optional organization fields without required indicator',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyOptionalOrganizationFields();

    }
  );


  // =====================================
  // TC-ORG-CRE-008
  // Verify Create button disabled initially
  // =====================================

  test(
    'TC-ORG-CRE-008 - Should keep Create button disabled initially',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyCreateButtonDisabled();

    }
  );


  // =====================================
  // TC-ORG-CRE-009
  // Organization Name validation
  // =====================================

  test(
    'TC-ORG-CRE-009 - Should validate required Organization Name field',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyOrganizationNameValidation();

    }
  );


  // =====================================
  // TC-ORG-CRE-010
  // Description validation
  // =====================================

  test(
    'TC-ORG-CRE-010 - Should validate required Description field',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyOrganizationDescriptionValidation();

    }
  );


  // =====================================
  // TC-ORG-CRE-011
  // Verify Organization Head section
  // =====================================

  test(
    'TC-ORG-CRE-011 - Should display Organization Head section',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .verifyOrganizationHeadSection();

    }
  );


  // =====================================
  // TC-ORG-CRE-012
  // Open Organization Head Selection
  // =====================================

  test(
    'TC-ORG-CRE-012 - Should open Organization Head Selection popup',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .openOrganizationHeadSelection();

    }
  );


  // =====================================
  // TC-ORG-CRE-013
  // Verify Organization Head Selection popup
  // =====================================

  test(
    'TC-ORG-CRE-013 - Should display Organization Head Selection popup',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .openOrganizationHeadSelection();

      await organizationPage
        .verifyOrganizationHeadSelectionPopup();

    }
  );


  // =====================================
  // TC-ORG-CRE-014
  // Select Organization Head
  // =====================================

  test(
    'TC-ORG-CRE-014 - Should select an organization head',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .openOrganizationHeadSelection();

      await organizationPage
        .selectOrganizationHead();

    }
  );


  // =====================================
  // TC-ORG-CRE-015
  // Save Organization Head Selection
  // =====================================

  test(
    'TC-ORG-CRE-015 - Should save Organization Head selection',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .openOrganizationHeadSelection();

      await organizationPage
        .selectOrganizationHead();

      await organizationPage
        .saveOrganizationHeadSelection();

    }
  );


  // =====================================
  // TC-ORG-CRE-016
  // Verify selected Organization Head
  // =====================================

  test(
    'TC-ORG-CRE-016 - Should display selected Organization Head',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .openOrganizationHeadSelection();

      const selectedEmployee =
        await organizationPage
          .selectOrganizationHead();

      await organizationPage
        .saveOrganizationHeadSelection();

      await organizationPage
        .verifySelectedOrganizationHead(
          selectedEmployee
        );

    }
  );


  // =====================================
  // TC-ORG-CRE-017
  // Verify popup closes automatically
  // =====================================

  test(
    'TC-ORG-CRE-017 - Should automatically close Organization Head Selection popup after saving',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .openOrganizationHeadSelection();

      await organizationPage
        .selectOrganizationHead();

      await organizationPage
        .saveOrganizationHeadSelection();

      await expect(
        organizationPage.organizationHeadSelectionTitle
      ).not.toBeVisible({
        timeout: 10000,
      });

    }
  );


  // =====================================
  // TC-ORG-CRE-018
  // Verify Create button enabled
  // =====================================

  test(
    'TC-ORG-CRE-018 - Should enable Create button after required fields are completed',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      await organizationPage
        .openAddOrganizationDrawer();

      await organizationPage
        .fillOrganizationDetails(
          organizationData.addOrganization.name,
          organizationData.addOrganization.description
        );

      await organizationPage
        .openOrganizationHeadSelection();

      await organizationPage
        .selectOrganizationHead();

      await organizationPage
        .saveOrganizationHeadSelection();

      await organizationPage
        .verifyCreateButtonEnabled();

    }
  );


  // =====================================
  // TC-ORG-CRE-019
  // Create organization with required
  // and optional fields
  // =====================================

  test(
    'TC-ORG-CRE-019 - Should create new organization with required fields and optional fields',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      const organizationName =
        `Automation Organization ${Date.now()}`;

      const description =
        organizationData.addOrganization.description;

      await organizationPage
        .openAddOrganizationDrawer();

      // Fill required fields
      await organizationPage
        .fillOrganizationDetails(
          organizationName,
          description
        );

      // Select organization head
      await organizationPage
        .openOrganizationHeadSelection();

      await organizationPage
        .selectOrganizationHead();

      await organizationPage
        .saveOrganizationHeadSelection();

      // Fill optional fields
      await organizationPage
        .fillContactInformation(
          organizationData.contactInformation.telephone,
          organizationData.contactInformation.address,
          organizationData.contactInformation.email,
          organizationData.contactInformation.website
        );

      // Verify Create button enabled
      await organizationPage
        .verifyCreateButtonEnabled();

      // Create organization
      await organizationPage
        .createOrganization();

    }
  );


  // =====================================
  // TC-ORG-CRE-020
  // Verify newly created organization
  // =====================================

  test(
    'TC-ORG-CRE-020 - Should display newly created organization',
    async () => {

      await organizationPage
        .navigateToBuildOrganization();

      const organizationName =
        `Automation Organization ${Date.now()}`;

      const description =
        organizationData.addOrganization.description;

      await organizationPage
        .openAddOrganizationDrawer();

      // Fill required fields
      await organizationPage
        .fillOrganizationDetails(
          organizationName,
          description
        );

      // Select organization head
      await organizationPage
        .openOrganizationHeadSelection();

      await organizationPage
        .selectOrganizationHead();

      await organizationPage
        .saveOrganizationHeadSelection();

      // Fill optional fields
      await organizationPage
        .fillContactInformation(
          organizationData.contactInformation.telephone,
          organizationData.contactInformation.address,
          organizationData.contactInformation.email,
          organizationData.contactInformation.website
        );

      // Create
      await organizationPage
        .createOrganization();

      // Verify
      await organizationPage
        .verifyOrganizationCreated(
          organizationName
        );

    }
  );

});